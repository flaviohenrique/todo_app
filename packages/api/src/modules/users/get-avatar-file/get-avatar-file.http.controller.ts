import { Request, Response } from "express";
import { Service } from "typedi";
import { AvatarNotFoundError, UserNotFoundError } from "../errors";
import { GetAvatarFileService } from "./get-avatar-file.service";

@Service()
export class GetAvatarFileController {
  constructor(private readonly getAvatarFileService: GetAvatarFileService) {}

  async getAvatarFile({ params }: Request, res: Response) {
    const result = await this.getAvatarFileService.execute(params.userId);

    result.unwrap(
      (avatar) => {
        res.status(200)
        .contentType(avatar.mimetype)
        .end(avatar.data)
      },
      (error) => {
        switch (error.message) {
          case UserNotFoundError.message:
            res.status(409).json(error.toJSON(true));  
            break;
          case AvatarNotFoundError.message:
            res.status(404).json(error.toJSON(true));  
            break;
          default:
            throw error;
        }
      }
    );
  }
}
