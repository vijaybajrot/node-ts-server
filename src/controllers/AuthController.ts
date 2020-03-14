import { getManager } from "typeorm";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseBefore
} from "routing-controllers";

import { mapErrors } from "../utils";
import validateToken from "../middlewares/validate-token";

import { BaseController } from "./BaseController";
import { User } from "./../entity/User";
import { IssueToken, TokenType } from "./../entity/IssueToken";

const ACCESS_TOKEN_SECRET = "3291a301e78049e077246cd8a89d08bf";
const REFRESH_TOKEN_SECRET = "8f1e9faabb6818e90ad8f142c6751fad";

@Controller("/auth")
export class AuthController extends BaseController {
  @Post("/login")
  async login(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const data = req.body;

    const errors: any[] = [];
    if (!data.username) {
      errors.push({
        path: "email",
        messages: {
          required: "email must be an email"
        }
      });
    }

    if (!data.password) {
      errors.push({
        path: "password",
        messages: {
          required: "email must be an email"
        }
      });
    }

    if (errors.length > 0) {
      return res.status(422).json({
        ok: false,
        message: "Validation failed",
        errors: mapErrors(errors)
      });
    }

    try {
      const user = (await User.findOne({ email: data.username })) as User;
      if (!user) {
        return res.status(401).json({
          ok: false,
          message: "Invaild Login Detail."
        });
      }
      if (!(await user.verifyPassword(data.password))) {
        return res.status(401).json({
          ok: false,
          message: "Invaild Login Detail."
        });
      }
      const accessToken = (await this.issueToken(user)) as IssueToken;
      if (accessToken) {
        return res.status(200).json({
          ok: true,
          message: "Logged In",
          data: {
            accessToken: accessToken.token,
            expiresAt: moment()
              .add(1, "hours")
              .unix()
          }
        });
      }
    } catch (error) {
      return res.status(400).json({
        ok: false,
        message: "Bad Request"
      });
    }

    return res.status(401).json({
      ok: false,
      message: "Invaild Login Detail"
    });
  }

  async issueToken(user: User): Promise<any> {
    const token = jwt.sign({ id: user.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: 60 * 60
    });

    const [issueToken] = await getManager()
      .createQueryBuilder()
      .from(IssueToken, "issueToken")
      .select("id")
      .where({ userId: user.id, tokenType: TokenType.ACCESS_TOKEN })
      .limit(1)
      .execute();

    if (!issueToken) {
      return await IssueToken.create({
        userId: user.id,
        tokenType: TokenType.ACCESS_TOKEN,
        token: token,
        issueAt: new Date()
      }).save();
    } else {
      const updateToken = await getManager()
        .createQueryBuilder()
        .update(IssueToken)
        .set({ token })
        .where({ id: issueToken.id })
        .execute();

      if (updateToken) {
        issueToken.token = token;
        return issueToken;
      }
    }
  }

  @Get("/user")
  @UseBefore(validateToken)
  async user(@Req() req: Request, @Res() res: Response): Promise<Response> {
    return res.json(req.params.user);
  }
}
