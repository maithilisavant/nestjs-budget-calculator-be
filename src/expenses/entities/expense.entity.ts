import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Group } from "../../groups/entities/group.entity"

@Entity()
export class Expense {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  title: string

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  paidBy: User

  @ManyToOne(() => Group, group => group.expenses, { onDelete: "CASCADE" })
  group: Group

  @Column({ type: "timestamp" })
  date: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
} 