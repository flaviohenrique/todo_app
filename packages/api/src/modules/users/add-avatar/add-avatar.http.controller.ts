import { Request, Response } from "express";
import { Service } from "typedi";
import { UserNotFoundError } from "../errors";
import { AddAvatarService } from "./add-avatar.service";
import multer from "multer";
import { IAddAvatar } from "../user";

@Service()
export class AddAvatarController {
  constructor(private readonly addAvatarService: AddAvatarService) {}

  uploadConfig(){
    return multer({ storage: multer.memoryStorage()}).single('avatar');
  }

  async addAvatar({ file, params }: Request, res: Response) {
    const addAvatarProps = <IAddAvatar>{
      name: file?.originalname,
      data: file?.buffer,
      mimetype: file?.mimetype,
      userId: params.userId
    };

    const result = await this.addAvatarService.execute(addAvatarProps);

    result.unwrap(
      (user) => {
        res.status(200).json(user);
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
