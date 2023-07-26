
import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, Repository<User>, JwtService],
  exports: [UserService, Repository<User>],
})
export class UserModule { }
