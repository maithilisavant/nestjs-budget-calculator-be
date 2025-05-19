import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { BudgetItem } from "../../budget-items/entities/budget-item.entity"

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  auth0Id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @OneToMany(
    () => BudgetItem,
    (budgetItem) => budgetItem.user,
  )
  budgetItems: BudgetItem[]
}
