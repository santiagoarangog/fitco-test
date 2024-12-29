import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { HashService } from 'src/common/services/hash.service';
import { ConfigUtil } from '../utils/config.utils';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { UtilsModule } from '../utils/utils.module';
import { User } from './entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, HashService, ConfigUtil],
  imports: [
    forwardRef(() => AuthModule),
    UtilsModule,
    TypeOrmModule.forFeature([User]),
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
