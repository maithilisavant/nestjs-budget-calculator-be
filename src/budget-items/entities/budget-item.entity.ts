import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "../../users/entities/user.entity"

export enum BudgetItemType {
  INCOME = "income",
  EXPENSE = "expense",
}

export enum BudgetItemCategory {
  SALARY = "salary",
  INVESTMENT = "investment",
  GIFT = "gift",
  HOUSING = "housing",
  TRANSPORTATION = "transportation",
  FOOD = "food",
  UTILITIES = "utilities",
  ENTERTAINMENT = "entertainment",
  HEALTHCARE = "healthcare",
  OTHER = "other",
}

@Entity()
export class BudgetItem {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number

  @Column({
    type: "enum",
    enum: BudgetItemType,
  })
  type: BudgetItemType

  @Column({
    type: "enum",
    enum: BudgetItemCategory,
  })
  category: BudgetItemCategory

  @Column({ nullable: true })
  description: string

  @Column({ type: "date" })
  date: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(
    () => User,
    (user) => user.budgetItems,
  )
  user: User
}
