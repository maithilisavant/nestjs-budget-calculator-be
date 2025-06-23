import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { passportJwtSecret } from "jwks-rsa"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get("AUTH0_ISSUER_URL")}.well-known/jwks.json`,
      }),
      audience: configService.get("AUTH0_AUDIENCE"),
      issuer: configService.get("AUTH0_ISSUER_URL"),
      algorithms: ["RS256"],
    })
  }

  async validate(payload: any) {
    return {
      sub: payload.sub,
      email: payload.email,
    }
  }
}
