import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AdminStats {
  @Field(() => Int)
  totalUsers: number;

  @Field(() => Int)
  totalWhitelisted: number;

  @Field(() => Int)
  totalTransactions: number;

  @Field(() => [WhitelistRequest])
  whitelistRequests: WhitelistRequest[];
}

@ObjectType()
export class WhitelistRequest {
  @Field()
  id: string;

  @Field()
  wallet: string;

  @Field()
  status: string;

  @Field()
  createdAt: string;
}