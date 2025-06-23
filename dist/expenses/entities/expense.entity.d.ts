import { User } from "../../users/entities/user.entity";
import { Group } from "../../groups/entities/group.entity";
export declare class Expense {
    id: string;
    title: string;
    amount: number;
    paidBy: User;
    group: Group;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}
