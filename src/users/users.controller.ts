import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './DTO/update-user.dto';
import { CreateUserDto } from './DTO/create-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './DTO/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private usersService: UsersService
    ,private authService : AuthService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body.email,body.password)
  }
  @Post('/signin')
  signIn(@Body() body : CreateUserDto){
    this.authService.signIn(body.email,body.password)
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
