import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { Expense } from "./entities/expense.entity";
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(createExpenseDto: CreateExpenseDto, req: any): Promise<Expense>;
    findOne(id: string): Promise<Expense>;
}
