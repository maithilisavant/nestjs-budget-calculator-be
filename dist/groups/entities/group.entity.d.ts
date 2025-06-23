import { User } from "../../users/entities/user.entity";
import { Expense } from "../../expenses/entities/expense.entity";
export declare class Group {
    id: string;
    name: string;
    createdBy: User;
    members: User[];
    expenses: Expense[];
    createdAt: Date;
    updatedAt: Date;
}
