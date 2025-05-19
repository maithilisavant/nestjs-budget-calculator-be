import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BudgetItemsService } from "./budget-items.service"
import { BudgetItemsController } from "./budget-items.controller"
import { BudgetItem } from "./entities/budget-item.entity"
import { UsersModule } from "../users/users.module"

@Module({
  imports: [TypeOrmModule.forFeature([BudgetItem]), UsersModule],
  providers: [BudgetItemsService],
  controllers: [BudgetItemsController],
})
export class BudgetItemsModule {}
