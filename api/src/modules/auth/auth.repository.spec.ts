import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepository } from './auth.repository';
import { TokenHistory } from './entitys/token-history.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthRepository', () => {
    let repository: AuthRepository;
    let tokenHistoryRepository: Repository<TokenHistory>;

    const mockTokenHistoryRepository = {
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthRepository,
                {
                    provide: getRepositoryToken(TokenHistory),
                    useValue: mockTokenHistoryRepository,
                },
            ],
        }).compile();

        repository = module.get<AuthRepository>(AuthRepository);
        tokenHistoryRepository = module.get<Repository<TokenHistory>>(getRepositoryToken(TokenHistory));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTokenHistory', () => {
        it('should create and save a token history', async () => {
            const email = 'test@example.com';
            const token = 'sample-token';
            const tokenHistory = new TokenHistory();
            tokenHistory.email = email;
            tokenHistory.token = token;

            mockTokenHistoryRepository.create.mockReturnValue(tokenHistory);
            mockTokenHistoryRepository.save.mockResolvedValue(tokenHistory);

            const result = await repository.createTokenHistory(email, token);

            expect(result).toEqual(tokenHistory);
            expect(mockTokenHistoryRepository.create).toHaveBeenCalledWith({ email, token });
            expect(mockTokenHistoryRepository.save).toHaveBeenCalledWith(tokenHistory);
        });
    });

    describe('findActiveToken', () => {
        it('should find an active token by email and token', async () => {
            const email = 'test@example.com';
            const token = 'sample-token';
            const tokenHistory = new TokenHistory();
            tokenHistory.email = email;
            tokenHistory.token = token;
            tokenHistory.isActive = true;

            mockTokenHistoryRepository.findOne.mockResolvedValue(tokenHistory);

            const result = await repository.findActiveToken(email, token);

            expect(result).toEqual(tokenHistory);
            expect(mockTokenHistoryRepository.findOne).toHaveBeenCalledWith({
                where: { email, token, isActive: true },
            });
        });

        it('should return undefined if no active token is found', async () => {
            const email = 'test@example.com';
            const token = 'sample-token';

            mockTokenHistoryRepository.findOne.mockResolvedValue(undefined);

            const result = await repository.findActiveToken(email, token);

            expect(result).toBeUndefined();
            expect(mockTokenHistoryRepository.findOne).toHaveBeenCalledWith({
                where: { email, token, isActive: true },
            });
        });
    });

    describe('deactivateToken', () => {
        it('should deactivate a token', async () => {
            const tokenHistory = new TokenHistory();
            tokenHistory.email = 'test@example.com';
            tokenHistory.token = 'sample-token';
            tokenHistory.isActive = true;

            mockTokenHistoryRepository.save.mockResolvedValue(tokenHistory);

            await repository.deactivateToken(tokenHistory);

            expect(tokenHistory.isActive).toBe(false);
            expect(mockTokenHistoryRepository.save).toHaveBeenCalledWith(tokenHistory);
        });
    });
});
