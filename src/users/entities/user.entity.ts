import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from "typeorm"
import { Group } from "../../groups/entities/group.entity"
import { Expense } from "../../expenses/entities/expense.entity"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  auth0Id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @ManyToMany(() => Group, group => group.members)
  groups: Group[]

  @OneToMany(() => Expense, expense => expense.paidBy)
  expenses: Expense[]

  @OneToMany(() => Group, group => group.createdBy)
  createdGroups: Group[]
}
