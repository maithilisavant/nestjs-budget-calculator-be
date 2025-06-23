import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto)
    return this.usersRepository.save(user)
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  async findOneByAuth0Id(auth0Id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { auth0Id } })
    if (!user) {
      throw new NotFoundException(`User with Auth0 ID ${auth0Id} not found`)
    }
    return user
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto)
    return this.findOne(id)
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
}
