import { Repository } from "typeorm";
import { Expense } from "./entities/expense.entity";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UsersService } from "../users/users.service";
import { GroupsService } from "../groups/groups.service";
export declare class ExpensesService {
    private expensesRepository;
    private usersService;
    private groupsService;
    constructor(expensesRepository: Repository<Expense>, usersService: UsersService, groupsService: GroupsService);
    create(createExpenseDto: CreateExpenseDto, userId: string): Promise<Expense>;
    findAllByGroup(groupId: string): Promise<Expense[]>;
    findOne(id: string): Promise<Expense>;
}
