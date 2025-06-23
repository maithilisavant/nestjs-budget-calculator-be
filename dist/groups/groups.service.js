"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const group_entity_1 = require("./entities/group.entity");
const users_service_1 = require("../users/users.service");
let GroupsService = class GroupsService {
    constructor(groupsRepository, usersService) {
        this.groupsRepository = groupsRepository;
        this.usersService = usersService;
    }
    async create(createGroupDto, creatorId) {
        const creator = await this.usersService.findOne(creatorId);
        if (!creator) {
            throw new common_1.NotFoundException("Creator not found");
        }
        const group = this.groupsRepository.create({
            name: createGroupDto.name,
            createdBy: creator,
            members: [creator],
        });
        if (createGroupDto.memberIds) {
            const members = await Promise.all(createGroupDto.memberIds.map(id => this.usersService.findOne(id)));
            const validMembers = members.filter(member => member !== null);
            group.members = [...group.members, ...validMembers];
        }
        return this.groupsRepository.save(group);
    }
    async findOne(id) {
        const group = await this.groupsRepository.findOne({
            where: { id },
            relations: ["members", "createdBy", "expenses", "expenses.paidBy"],
        });
        if (!group) {
            throw new common_1.NotFoundException(`Group with ID ${id} not found`);
        }
        return group;
    }
    async inviteMember(groupId, email) {
        const group = await this.findOne(groupId);
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found`);
        }
        if (group.members.some(member => member.id === user.id)) {
            throw new common_1.BadRequestException("User is already a member of this group");
        }
        group.members = [...group.members, user];
        await this.groupsRepository.save(group);
    }
    async getGroupExpenses(groupId) {
        const group = await this.findOne(groupId);
        return group.expenses;
    }
    async calculateGroupBalance(groupId) {
        const group = await this.findOne(groupId);
        const expenses = group.expenses;
        const members = group.members;
        const memberSpent = new Map();
        members.forEach(member => memberSpent.set(member.id, 0));
        expenses.forEach(expense => {
            const current = memberSpent.get(expense.paidBy.id) || 0;
            memberSpent.set(expense.paidBy.id, current + Number(expense.amount));
        });
        const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
        const perPersonShare = total / members.length;
        const balances = members.map(member => ({
            userId: member.id,
            amount: (memberSpent.get(member.id) || 0) - perPersonShare
        }));
        const settlements = this.calculateSettlements(balances);
        return {
            balances,
            settlements,
            total,
            perPersonShare
        };
    }
    calculateSettlements(balances) {
        const settlements = [];
        const debtors = balances.filter(b => b.amount < 0).sort((a, b) => a.amount - b.amount);
        const creditors = balances.filter(b => b.amount > 0).sort((a, b) => b.amount - a.amount);
        for (const debtor of debtors) {
            let remainingDebt = Math.abs(debtor.amount);
            for (const creditor of creditors) {
                if (remainingDebt === 0)
                    break;
                if (creditor.amount === 0)
                    continue;
                const settlementAmount = Math.min(remainingDebt, creditor.amount);
                if (settlementAmount > 0) {
                    settlements.push({
                        from: debtor.userId,
                        to: creditor.userId,
                        amount: settlementAmount
                    });
                    remainingDebt -= settlementAmount;
                    creditor.amount -= settlementAmount;
                }
            }
        }
        return settlements;
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_entity_1.Group)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map