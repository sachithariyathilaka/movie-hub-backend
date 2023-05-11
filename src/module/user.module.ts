import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user.controller';
import { User } from 'src/entity/user';
import { UserService } from 'src/service/user.service';
import { JwtStrategy } from '../config/jwt-strategy';
import { secretKey } from '../config/constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: 10000000000 },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
