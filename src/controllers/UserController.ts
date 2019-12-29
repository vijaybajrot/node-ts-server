import { Request, Response } from "express";
import { getManager } from "typeorm";
import { validate } from "class-validator";

import { User } from "./../entity/User";
import { BaseController } from "./BaseController";
import { mapErrors } from "../utils";

export class UserController extends BaseController {
  static async getUsers(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const query = getManager().createQueryBuilder(User, "user");
    const users = await super.createPagination(query, {
      page
    });

    return res.status(200).json(users);
  }

  static async getUserById(req: Request, res: Response): Promise<Response> {
    const user = await User.findOne<User>({ id: parseInt(req.params.id) });
    return res.status(200).json(user);
  }

  static async createUser(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const user = User.create(data);

    let errors = await validate(user);
    if (errors.length > 0) {
      return res.status(422).json({
        ok: false,
        message: "Validation failed",
        errors: mapErrors(errors)
      });
    }

    try {
      user.password = await user.bcryptPassword(user.password);
      await user.save();
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: "Unable to create user"
      });
    }

    return res.status(200).json({
      ok: true,
      message: "User Created"
    });
  }
}
