import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class RequestService {
  constructor(private readonly logger: LoggerService) {}
  private userId: string;

  setUserId(userId: string): void {
    this.userId = userId;
    this.logger.log('Setting user id', userId);
  }

  getUserId(): string {
    this.logger.log('Getting user id');
    return this.userId;
  }
}
