import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenHistory } from './entitys/token-history.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectRepository(TokenHistory)
    private readonly tokenHistoryRepository: Repository<TokenHistory>,
  ) {}

  async createTokenHistory(
    email: string,
    token: string,
  ): Promise<TokenHistory> {
    const tokenHistory = this.tokenHistoryRepository.create({ email, token });
    return this.tokenHistoryRepository.save(tokenHistory);
  }

  async findActiveToken(
    email: string,
    token: string,
  ): Promise<TokenHistory | undefined> {
    return this.tokenHistoryRepository.findOne({
      where: { email, token, isActive: true },
    });
  }

  async desactivateToken(token: TokenHistory): Promise<void> {
    token.isActive = false;
    await this.tokenHistoryRepository.save(token);
  }
}
