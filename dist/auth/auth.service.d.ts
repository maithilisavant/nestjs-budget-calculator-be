import { UsersService } from "../users/users.service";
import type { User } from "../users/entities/user.entity";
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    validateUser(payload: any): Promise<User>;
}
