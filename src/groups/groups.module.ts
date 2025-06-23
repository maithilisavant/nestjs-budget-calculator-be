import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GroupsService } from "./groups.service"
import { GroupsController } from "./groups.controller"
import { Group } from "./entities/group.entity"
import { UsersModule } from "../users/users.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    UsersModule
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService]
})
export class GroupsModule {} 