import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common"
import type { BudgetItemsService } from "./budget-items.service"
import type { CreateBudgetItemDto } from "./dto/create-budget-item.dto"
import type { UpdateBudgetItemDto } from "./dto/update-budget-item.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger"

@ApiTags("budget-items")
@Controller("budget-items")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class BudgetItemsController {
  constructor(private readonly budgetItemsService: BudgetItemsService) {}

  @Post()
  create(@Body() createBudgetItemDto: CreateBudgetItemDto, @Req() req: any) {
    return this.budgetItemsService.create(createBudgetItemDto, req.user)
  }

  @Get()
  findAll(@Req() req: any) {
    return this.budgetItemsService.findAll(req.user.id);
  }

  @Get(":id")
  findOne(@Param('id') id: string, @Req() req) {
    return this.budgetItemsService.findOne(+id, req.user.id)
  }

  @Patch(":id")
  update(@Param('id') id: string, @Body() updateBudgetItemDto: UpdateBudgetItemDto, @Req() req) {
    return this.budgetItemsService.update(+id, updateBudgetItemDto, req.user.id)
  }

  @Delete(":id")
  remove(@Param('id') id: string, @Req() req) {
    return this.budgetItemsService.remove(+id, req.user.id)
  }
}
