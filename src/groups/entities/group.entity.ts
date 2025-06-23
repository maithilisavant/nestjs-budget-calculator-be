import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Expense } from "../../expenses/entities/expense.entity"

@Entity()
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  createdBy: User

  @ManyToMany(() => User, { onDelete: "CASCADE" })
  @JoinTable({
    name: "group_members",
    joinColumn: { name: "group_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "user_id", referencedColumnName: "id" }
  })
  members: User[]

  @OneToMany(() => Expense, expense => expense.group)
  expenses: Expense[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
} 