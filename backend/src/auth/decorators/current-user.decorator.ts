import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req?.user;
    console.log('*** CurrentUser decorator called ***');
    console.log('User from context:', user);
    
    return data ? user?.[data] : user;
  },
);
