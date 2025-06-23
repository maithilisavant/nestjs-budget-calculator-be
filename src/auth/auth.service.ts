import { Injectable } from "@nestjs/common"
import { UsersService } from "../users/users.service"
import type { User } from "../users/entities/user.entity"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(payload: any): Promise<User> {
    // Find user by Auth0 ID or create if not exists
    const { sub, email, name } = payload

    let user = await this.usersService.findOneByAuth0Id(sub)

    if (!user) {
      user = await this.usersService.create({
        auth0Id: sub,
        email,
        name,
      })
    }

    return user
  }
}
