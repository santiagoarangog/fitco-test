import { config } from 'dotenv';
config();
import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigUtil } from '../utils/config.utils';
import { UtilsModule } from '../utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenHistory } from './entitys/token-history.entity';
import { AuthRepository } from './auth.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, ConfigUtil],
  exports: [AuthService, AuthRepository],
  imports: [
    forwardRef(() => UserModule),
    UtilsModule,
    JwtModule.register({
      global: true,
      secret: process.env.KEY,
      signOptions: { expiresIn: '3600s' },
    }),
    TypeOrmModule.forFeature([TokenHistory]),
  ],
})
export class AuthModule {}
