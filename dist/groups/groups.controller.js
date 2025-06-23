"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const groups_service_1 = require("./groups.service");
const create_group_dto_1 = require("./dto/create-group.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let GroupsController = class GroupsController {
    constructor(groupsService) {
        this.groupsService = groupsService;
    }
    create(createGroupDto, req) {
        return this.groupsService.create(createGroupDto, req.user.sub);
    }
    findOne(id) {
        return this.groupsService.findOne(id);
    }
    inviteMember(id, email) {
        return this.groupsService.inviteMember(id, email);
    }
    getGroupExpenses(id) {
        return this.groupsService.getGroupExpenses(id);
    }
    calculateGroupBalance(id) {
        return this.groupsService.calculateGroupBalance(id);
    }
};
exports.GroupsController = GroupsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new group" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Group successfully created" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad request" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Unauthorized" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupDto, Object]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a group by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Group found" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Group not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(":id/invite"),
    (0, swagger_1.ApiOperation)({ summary: "Invite a member to a group" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Member successfully invited" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad request" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Group or user not found" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "inviteMember", null);
__decorate([
    (0, common_1.Get)(":id/expenses"),
    (0, swagger_1.ApiOperation)({ summary: "Get all expenses for a group" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Expenses retrieved successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Group not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "getGroupExpenses", null);
__decorate([
    (0, common_1.Get)(":id/balance"),
    (0, swagger_1.ApiOperation)({ summary: "Calculate group balance and settlements" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Balance calculated successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Group not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupsController.prototype, "calculateGroupBalance", null);
exports.GroupsController = GroupsController = __decorate([
    (0, swagger_1.ApiTags)("groups"),
    (0, common_1.Controller)("groups"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [groups_service_1.GroupsService])
], GroupsController);
//# sourceMappingURL=groups.controller.js.map