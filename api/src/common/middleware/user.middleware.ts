import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/modules/user/entitys/user.entity';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    next();
  }
  private async getCurrentUser(req: Request): Promise<User> {
    return await this.getCurrentUser(req);
  }
}
