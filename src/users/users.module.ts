import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
@Module({
  imports : [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    { 
      provide : APP_INTERCEPTOR,
      useClass :  CurrentUserInterceptor
    },]
})
export class UsersModule {}
