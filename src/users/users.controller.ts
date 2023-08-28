import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './DTO/update-user.dto';
import { CreateUserDto } from './DTO/create-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
   const user =  await this.usersService.findOne(parseInt(id));
   if(!user){
    throw new NotFoundException('user not found')
} 
   return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id') 
  removeUser(@Param('id') id : string){
    this.usersService.remove(parseInt(id))
  }

  @Patch('/:id')
  updateUser(@Param('id') id : string,@Body() body : UpdateUserDto){
    return this.usersService.update(parseInt(id),body);
  }
}
