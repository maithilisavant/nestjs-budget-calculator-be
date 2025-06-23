"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const expenses_service_1 = require("./expenses.service");
const expenses_controller_1 = require("./expenses.controller");
const expense_entity_1 = require("./entities/expense.entity");
const users_module_1 = require("../users/users.module");
const groups_module_1 = require("../groups/groups.module");
let ExpensesModule = class ExpensesModule {
};
exports.ExpensesModule = ExpensesModule;
exports.ExpensesModule = ExpensesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([expense_entity_1.Expense]),
            users_module_1.UsersModule,
            groups_module_1.GroupsModule
        ],
        controllers: [expenses_controller_1.ExpensesController],
        providers: [expenses_service_1.ExpensesService],
        exports: [expenses_service_1.ExpensesService]
    })
], ExpensesModule);
//# sourceMappingURL=expenses.module.js.map