import { Controller, Get, Post, Body, Param, UseGuards, Request } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { ExpensesService } from "./expenses.service"
import { CreateExpenseDto } from "./dto/create-expense.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { Expense } from "./entities/expense.entity"

@ApiTags("expenses")
@Controller("expenses")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new expense" })
  @ApiResponse({ status: 201, description: "Expense created successfully", type: Expense })
  create(@Body() createExpenseDto: CreateExpenseDto, @Request() req) {
    return this.expensesService.create(createExpenseDto, req.user.sub)
  }

  @Get(":id")
  @ApiOperation({ summary: "Get expense details" })
  @ApiResponse({ status: 200, description: "Expense details retrieved successfully", type: Expense })
  findOne(@Param("id") id: string) {
    return this.expensesService.findOne(id)
  }
} 