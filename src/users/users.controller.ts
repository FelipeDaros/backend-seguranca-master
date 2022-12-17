import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { json, Response } from 'express';
import { CreateUserDto } from './dto/CreateUser.dto';
import { SigninDto } from './dto/Signin.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ){}

  @Get()
  public findAll(){
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createUserDto:CreateUserDto){
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  public update(@Param('id')id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response){
    this.userService.update(id, updateUserDto);

    return res.json({message: "Usuário alterado com sucesso!"});
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public delete(@Param('id')id: string, @Res() res: Response){
    this.userService.delete(id);

    return res.json({message: "Usuário deletado com sucesso!"});
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  public sigin(@Body() signinDto:SigninDto){
    return this.userService.signin(signinDto);
  }
}
