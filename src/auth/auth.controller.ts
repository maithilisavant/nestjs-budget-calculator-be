import { Controller, UseGuards, Req, Get } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import type { AuthService } from "./auth.service"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req: any) {
    return req.user;
  }
}
