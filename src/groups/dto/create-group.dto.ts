import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsOptional, IsArray, IsEmail } from "class-validator"

export class CreateGroupDto {
  @ApiProperty({
    description: "The name of the group",
    example: "Trip to Paris"
  })
  @IsString()
  name: string

  @ApiProperty({
    description: "Optional array of member IDs to add to the group",
    example: ["user1", "user2"],
    required: false
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  memberIds?: string[]
} 