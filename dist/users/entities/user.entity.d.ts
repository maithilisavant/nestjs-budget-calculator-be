import { Group } from "../../groups/entities/group.entity";
import { Expense } from "../../expenses/entities/expense.entity";
export declare class User {
    id: string;
    auth0Id: string;
    name: string;
    email: string;
    groups: Group[];
    expenses: Expense[];
    createdGroups: Group[];
}
