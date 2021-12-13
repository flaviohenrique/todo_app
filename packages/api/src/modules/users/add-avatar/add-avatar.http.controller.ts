import { AvatarEntity } from "./../avatar";
import { AvatarMapper } from "./../mapper";
import { Request, Response } from "express";
import { Service } from "typedi";
import { UserNotFoundError } from "../errors";
import { AddAvatarService } from "./add-avatar.service";
import multer from "multer";
import type { IAddAvatar } from "../types";

export const uploadConfig = multer({ storage: multer.memoryStorage() }).single(
  "avatar"
);

@Service()
export class AddAvatarController {
  constructor(private readonly addAvatarService: AddAvatarService) {}

  async addAvatar({ file, params }: Request, res: Response): Promise<void> {
    const addAvatarProps = <IAddAvatar>{
      name: file?.originalname,
      data: file?.buffer,
      mimetype: file?.mimetype,
      userId: params.userId,
    };

    const result = await this.addAvatarService.execute(addAvatarProps);

    result.unwrap(
      (user) => {
        res.status(200).json(AvatarMapper.toDTO(user.avatar as AvatarEntity));
      },
      (error) => {
        if (error instanceof UserNotFoundError) {
          res.status(409).json(error.toJSON(true));
        } else {
          throw error;
        }
      }
    );
  }
}
