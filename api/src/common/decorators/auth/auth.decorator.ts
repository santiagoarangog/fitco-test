import { SetMetadata } from '@nestjs/common';

export const Decorators = (...args: string[]) =>
  SetMetadata('decorators', args);
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
