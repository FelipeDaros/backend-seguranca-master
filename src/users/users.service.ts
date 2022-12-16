import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { User } from './entities/User.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  public async findAll(): Promise<User[]>{
    const users = await this.userRepository.find();

    return users;
  }

  public async create(createUserDto:CreateUserDto): Promise<User>{
    const userExits = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });

    if(userExits){
      throw new HttpException({
        status: HttpStatus.FOUND,
        error: 'Email já está cadastradp'
      }, HttpStatus.FOUND)
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const userCreate = this.userRepository.create({
      email: createUserDto.email,
      password: passwordHash
    });

    await this.userRepository.save(userCreate);

    return userCreate;
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<void>{
    const userExits = await this.userRepository.findOne(id);

    if(userExits){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Usuário não encontrado!'
      }, HttpStatus.NOT_FOUND)
    }

    await this.userRepository.update(id, updateUserDto);
    
    return null;
  }

  public async delete(id: string): Promise<void>{
    const userExits = await this.userRepository.findOne(id);

    if(userExits){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Usuário não encontrado!'
      }, HttpStatus.NOT_FOUND)
    }

    return null
  }
}
