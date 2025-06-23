import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Expense } from "./entities/expense.entity"
import { CreateExpenseDto } from "./dto/create-expense.dto"
import { UsersService } from "../users/users.service"
import { GroupsService } from "../groups/groups.service"

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
    private usersService: UsersService,
    private groupsService: GroupsService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, userId: string): Promise<Expense> {
    const [paidBy, group] = await Promise.all([
      this.usersService.findOne(userId),
      this.groupsService.findOne(createExpenseDto.groupId)
    ])

    if (!paidBy) {
      throw new NotFoundException("User not found")
    }

    if (!group) {
      throw new NotFoundException("Group not found")
    }

    // Verify user is a member of the group
    if (!group.members.some(member => member.id === userId)) {
      throw new NotFoundException("User is not a member of this group")
    }

    const expense = this.expensesRepository.create({
      ...createExpenseDto,
      paidBy,
      group,
      date: new Date(createExpenseDto.date)
    })

    return this.expensesRepository.save(expense)
  }

  async findAllByGroup(groupId: string): Promise<Expense[]> {
    const group = await this.groupsService.findOne(groupId)
    return this.expensesRepository.find({
      where: { group: { id: groupId } },
      relations: ["paidBy", "group"],
      order: { date: "DESC" }
    })
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expensesRepository.findOne({
      where: { id },
      relations: ["paidBy", "group"]
    })

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`)
    }

    return expense
  }
} 