import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { Group } from "./entities/group.entity";
export declare class GroupsController {
    private readonly groupsService;
    constructor(groupsService: GroupsService);
    create(createGroupDto: CreateGroupDto, req: any): Promise<Group>;
    findOne(id: string): Promise<Group>;
    inviteMember(id: string, email: string): Promise<void>;
    getGroupExpenses(id: string): Promise<import("../expenses/entities/expense.entity").Expense[]>;
    calculateGroupBalance(id: string): Promise<{
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
}
