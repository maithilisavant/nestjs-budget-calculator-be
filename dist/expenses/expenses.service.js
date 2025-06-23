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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("./entities/expense.entity");
const users_service_1 = require("../users/users.service");
const groups_service_1 = require("../groups/groups.service");
let ExpensesService = class ExpensesService {
    constructor(expensesRepository, usersService, groupsService) {
        this.expensesRepository = expensesRepository;
        this.usersService = usersService;
        this.groupsService = groupsService;
    }
    async create(createExpenseDto, userId) {
        const [paidBy, group] = await Promise.all([
            this.usersService.findOne(userId),
            this.groupsService.findOne(createExpenseDto.groupId)
        ]);
        if (!paidBy) {
            throw new common_1.NotFoundException("User not found");
        }
        if (!group) {
            throw new common_1.NotFoundException("Group not found");
        }
        if (!group.members.some(member => member.id === userId)) {
            throw new common_1.NotFoundException("User is not a member of this group");
        }
        const expense = this.expensesRepository.create(Object.assign(Object.assign({}, createExpenseDto), { paidBy,
            group, date: new Date(createExpenseDto.date) }));
        return this.expensesRepository.save(expense);
    }
    async findAllByGroup(groupId) {
        const group = await this.groupsService.findOne(groupId);
        return this.expensesRepository.find({
            where: { group: { id: groupId } },
            relations: ["paidBy", "group"],
            order: { date: "DESC" }
        });
    }
    async findOne(id) {
        const expense = await this.expensesRepository.findOne({
            where: { id },
            relations: ["paidBy", "group"]
        });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
        return expense;
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        groups_service_1.GroupsService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map