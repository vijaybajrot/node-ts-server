import { Request, Response } from "express";
import { getManager } from "typeorm";
import { validate } from "class-validator";
import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Req,
  Res
} from "routing-controllers";

import { mapErrors } from "../utils";
import { User } from "../entity/User";

import { BaseController } from "./BaseController";

@Controller()
export class UserController extends BaseController {
  @Get("/users")
  async getUsers(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const query = getManager().createQueryBuilder(User, "user");
    const users = await this.buildPagination(query, {
      page
    });

    return res.status(200).json(users);
  }

  @Get("/users/:id")
  async getUserById(
    @Param("id") id: number,
    @Res() res: Response
  ): Promise<Response> {
    const user = await User.findOne<User>({ id });
    return res.status(200).json(user);
  }

  @Post("/users")
  async createUser(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response> {
    const data = req.body;
    const user = User.create(data);

    const errors = await validate(user);
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
