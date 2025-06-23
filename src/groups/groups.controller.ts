import { Controller, Get, Post, Body, Param, UseGuards, Request } from "@nestjs/common"
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { GroupsService } from "./groups.service"
import { CreateGroupDto } from "./dto/create-group.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { Group } from "./entities/group.entity"

@ApiTags("groups")
@Controller("groups")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new group" })
  @ApiResponse({ status: 201, description: "Group successfully created" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  create(@Body() createGroupDto: CreateGroupDto, @Request() req) {
    return this.groupsService.create(createGroupDto, req.user.sub)
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a group by ID" })
  @ApiResponse({ status: 200, description: "Group found" })
  @ApiResponse({ status: 404, description: "Group not found" })
  findOne(@Param("id") id: string) {
    return this.groupsService.findOne(id)
  }

  @Post(":id/invite")
  @ApiOperation({ summary: "Invite a member to a group" })
  @ApiResponse({ status: 200, description: "Member successfully invited" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "Group or user not found" })
  inviteMember(@Param("id") id: string, @Body("email") email: string) {
    return this.groupsService.inviteMember(id, email)
  }

  @Get(":id/expenses")
  @ApiOperation({ summary: "Get all expenses for a group" })
  @ApiResponse({ status: 200, description: "Expenses retrieved successfully" })
  @ApiResponse({ status: 404, description: "Group not found" })
  getGroupExpenses(@Param("id") id: string) {
    return this.groupsService.getGroupExpenses(id)
  }

  @Get(":id/balance")
  @ApiOperation({ summary: "Calculate group balance and settlements" })
  @ApiResponse({ status: 200, description: "Balance calculated successfully" })
  @ApiResponse({ status: 404, description: "Group not found" })
  calculateGroupBalance(@Param("id") id: string) {
    return this.groupsService.calculateGroupBalance(id)
  }
} 