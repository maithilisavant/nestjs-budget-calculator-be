import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { BudgetItem } from "./entities/budget-item.entity"
import type { CreateBudgetItemDto } from "./dto/create-budget-item.dto"
import type { UpdateBudgetItemDto } from "./dto/update-budget-item.dto"
import type { User } from "../users/entities/user.entity"

@Injectable()
export class BudgetItemsService {
  constructor(
    @InjectRepository(BudgetItem)
    private budgetItemsRepository: Repository<BudgetItem>,
  ) {}

  async create(createBudgetItemDto: CreateBudgetItemDto, user: User): Promise<BudgetItem> {
    const budgetItem = this.budgetItemsRepository.create({
      ...createBudgetItemDto,
      user,
    })
    return this.budgetItemsRepository.save(budgetItem)
  }

  async findAll(userId: number): Promise<BudgetItem[]> {
    return this.budgetItemsRepository.find({
      where: { user: { id: userId } },
    })
  }

  async findOne(id: number, userId: number): Promise<BudgetItem> {
    const budgetItem = await this.budgetItemsRepository.findOne({
      where: { id, user: { id: userId } },
    })

    if (!budgetItem) {
      throw new NotFoundException(`Budget item with ID ${id} not found`)
    }

    return budgetItem
  }

  async update(id: number, updateBudgetItemDto: UpdateBudgetItemDto, userId: number): Promise<BudgetItem> {
    const budgetItem = await this.findOne(id, userId)

    Object.assign(budgetItem, updateBudgetItemDto)

    return this.budgetItemsRepository.save(budgetItem)
  }

  async remove(id: number, userId: number): Promise<void> {
    const budgetItem = await this.findOne(id, userId)
    await this.budgetItemsRepository.remove(budgetItem)
  }
}
