import { Module } from '@nestjs/common';
import { ConfigUtil } from './config.utils';

@Module({
  providers: [ConfigUtil],
  exports: [ConfigUtil],
})
export class UtilsModule {}
