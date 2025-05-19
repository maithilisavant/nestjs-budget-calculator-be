import { IsNotEmpty, IsNumber, IsEnum, IsString, IsOptional, IsDateString, Min } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { BudgetItemType, BudgetItemCategory } from "../entities/budget-item.entity"

export class CreateBudgetItemDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number

  @ApiProperty({ enum: BudgetItemType })
  @IsNotEmpty()
  @IsEnum(BudgetItemType)
  type: BudgetItemType

  @ApiProperty({ enum: BudgetItemCategory })
  @IsNotEmpty()
  @IsEnum(BudgetItemCategory)
  category: BudgetItemCategory

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string
}
