import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./auth/auth.module"
import { GroupsModule } from "./groups/groups.module"
import { ExpensesModule } from "./expenses/expenses.module"
import { User } from "./users/entities/user.entity"
import { Group } from "./groups/entities/group.entity"
import { Expense } from "./expenses/entities/expense.entity"

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
        entities: [User, Group, Expense],
        synchronize: configService.get<boolean>("DB_SYNCHRONIZE", true),
      }),
    }),
    UsersModule,
    AuthModule,
    GroupsModule,
    ExpensesModule,
  ],
})
export class AppModule {}
