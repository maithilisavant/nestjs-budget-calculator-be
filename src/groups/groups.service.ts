import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Group } from "./entities/group.entity"
import { CreateGroupDto } from "./dto/create-group.dto"
import { UsersService } from "../users/users.service"
import { User } from "../users/entities/user.entity"

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
    private usersService: UsersService,
  ) {}

  async create(createGroupDto: CreateGroupDto, creatorId: string): Promise<Group> {
    const creator = await this.usersService.findOne(creatorId)
    if (!creator) {
      throw new NotFoundException("Creator not found")
    }

    const group = this.groupsRepository.create({
      name: createGroupDto.name,
      createdBy: creator,
      members: [creator],
    })

    if (createGroupDto.memberIds) {
      const members = await Promise.all(
        createGroupDto.memberIds.map(id => this.usersService.findOne(id))
      )
      const validMembers = members.filter(member => member !== null)
      group.members = [...group.members, ...validMembers]
    }

    return this.groupsRepository.save(group)
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.groupsRepository.findOne({
      where: { id },
      relations: ["members", "createdBy", "expenses", "expenses.paidBy"],
    })

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`)
    }

    return group
  }

  async inviteMember(groupId: string, email: string): Promise<void> {
    const group = await this.findOne(groupId)
    const user = await this.usersService.findOneByEmail(email)

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`)
    }

    if (group.members.some(member => member.id === user.id)) {
      throw new BadRequestException("User is already a member of this group")
    }

    group.members = [...group.members, user]
    await this.groupsRepository.save(group)
  }

  async getGroupExpenses(groupId: string) {
    const group = await this.findOne(groupId)
    return group.expenses
  }

  async calculateGroupBalance(groupId: string) {
    const group = await this.findOne(groupId)
    const expenses = group.expenses
    const members = group.members

    // Calculate total spent by each member
    const memberSpent = new Map<string, number>()
    members.forEach(member => memberSpent.set(member.id, 0))

    expenses.forEach(expense => {
      const current = memberSpent.get(expense.paidBy.id) || 0
      memberSpent.set(expense.paidBy.id, current + Number(expense.amount))
    })

    // Calculate total and per person share
    const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
    const perPersonShare = total / members.length

    // Calculate final balances
    const balances = members.map(member => ({
      userId: member.id,
      amount: (memberSpent.get(member.id) || 0) - perPersonShare
    }))

    // Calculate settlements
    const settlements = this.calculateSettlements(balances)

    return {
      balances,
      settlements,
      total,
      perPersonShare
    }
  }

  private calculateSettlements(balances: { userId: string; amount: number }[]) {
    const settlements: { from: string; to: string; amount: number }[] = []
    const debtors = balances.filter(b => b.amount < 0).sort((a, b) => a.amount - b.amount)
    const creditors = balances.filter(b => b.amount > 0).sort((a, b) => b.amount - a.amount)

    for (const debtor of debtors) {
      let remainingDebt = Math.abs(debtor.amount)

      for (const creditor of creditors) {
        if (remainingDebt === 0) break
        if (creditor.amount === 0) continue

        const settlementAmount = Math.min(remainingDebt, creditor.amount)
        if (settlementAmount > 0) {
          settlements.push({
            from: debtor.userId,
            to: creditor.userId,
            amount: settlementAmount
          })

          remainingDebt -= settlementAmount
          creditor.amount -= settlementAmount
        }
      }
    }

    return settlements
  }
} 