import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common/interfaces';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http')
      return context.switchToHttp().getRequest().user;
  },
);
