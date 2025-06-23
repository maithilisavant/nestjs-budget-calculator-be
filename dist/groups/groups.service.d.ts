import { Repository } from "typeorm";
import { Group } from "./entities/group.entity";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UsersService } from "../users/users.service";
export declare class GroupsService {
    private groupsRepository;
    private usersService;
    constructor(groupsRepository: Repository<Group>, usersService: UsersService);
    create(createGroupDto: CreateGroupDto, creatorId: string): Promise<Group>;
    findOne(id: string): Promise<Group>;
    inviteMember(groupId: string, email: string): Promise<void>;
    getGroupExpenses(groupId: string): Promise<import("../expenses/entities/expense.entity").Expense[]>;
    calculateGroupBalance(groupId: string): Promise<{
        balances: {
            userId: string;
            amount: number;
        }[];
        settlements: {
            from: string;
            to: string;
            amount: number;
        }[];
        total: number;
        perPersonShare: number;
    }>;
    private calculateSettlements;
}
