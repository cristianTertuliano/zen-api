import { Account } from "@core/entity/account/account.entity";
import { User } from "@core/entity/user/user.entity";

export interface JwtPayload {
  account: Account,
  user: User,
}