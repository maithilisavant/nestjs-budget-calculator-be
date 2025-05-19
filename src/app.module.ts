import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module"
import { BudgetItemsModule } from "./budget-items/budget-items.module"
import { AuthModule } from "./auth/auth.module"
import { User } from "./users/entities/user.entity"
import { BudgetItem } from "./budget-items/entities/budget-item.entity"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST", "localhost"),
        port: configService.get<number>("DB_PORT", 5432),
        username: configService.get("DB_USERNAME", "postgres"),
        password: configService.get("DB_PASSWORD", "postgres"),
        database: configService.get("DB_DATABASE", "budget_calculator"),
        entities: [User, BudgetItem],
        synchronize: configService.get<boolean>("DB_SYNCHRONIZE", true),
      }),
    }),
    UsersModule,
    BudgetItemsModule,
    AuthModule,
  ],
})
export class AppModule {}
