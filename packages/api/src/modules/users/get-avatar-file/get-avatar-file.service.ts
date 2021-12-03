import { UserRepository } from "../user.repository";
import { Service } from "typedi";
import { Result } from "@badrap/result";
import { UserNotFoundError, AvatarNotFoundError } from "../errors";
import { AvatarEntity } from "../avatar";

@Service()
export class GetAvatarFileService {
  constructor(private repository: UserRepository) {}

  async execute(
    userId: string
  ): Promise<Result<AvatarEntity, UserNotFoundError | AvatarNotFoundError>> {
    const user = await this.repository.findByIdWithAvatar(userId);

    if (user === undefined) {
      return Result.err<UserNotFoundError>(new UserNotFoundError());
    }

    const avatar = user.getAvatar();

    if (avatar === undefined) {
      return Result.err<AvatarNotFoundError>(new AvatarNotFoundError());
    }

    return Result.ok(avatar);
  }
}
