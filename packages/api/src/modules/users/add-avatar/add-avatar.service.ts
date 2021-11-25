import { UserRepository } from "../user.repository";
import { UserEntity, IAddAvatar } from "../../users/user";
import { Service } from "typedi";
import { Result } from "@badrap/result";
import { UserNotFoundError } from "../errors";

@Service()
export class AddAvatarService {
  constructor(private repository: UserRepository) {}

  async execute(
    addAvatarProps: IAddAvatar
  ): Promise<Result<UserEntity, UserNotFoundError>> {
    const user = await this.repository.findById(addAvatarProps.userId);

    if (user === undefined) {
      return Result.err<UserNotFoundError>(new UserNotFoundError());
    }

    user?.addAvatar(addAvatarProps);

    const added = await this.repository.update(user);

    return Result.ok(added);
  }
}
