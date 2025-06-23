import { IsNotEmpty, IsString, IsNumber, IsUUID, IsDateString, Min } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateExpenseDto {
  @ApiProperty({ description: "Title of the expense" })
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty({ description: "Amount of the expense" })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number

  @ApiProperty({ description: "ID of the group this expense belongs to" })
  @IsNotEmpty()
  @IsUUID()
  groupId: string

  @ApiProperty({ description: "Date of the expense" })
  @IsNotEmpty()
  @IsDateString()
  date: string
} 