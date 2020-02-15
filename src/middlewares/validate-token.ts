import moment from "moment";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../entity/User";
import { IssueToken, TokenType } from "../entity/IssueToken";

const ACCESS_TOKEN_SECRET = "3291a301e78049e077246cd8a89d08bf";
const REFRESH_TOKEN_SECRET = "8f1e9faabb6818e90ad8f142c6751fad";

export function verifyToken(token: any) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, decodedToken: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(decodedToken);
      }
    });
  });
}

export function checkIssueToken(token: any) {
  return IssueToken.createQueryBuilder()
    .select("id")
    .where({ userId: token.id, tokenType: TokenType.ACCESS_TOKEN })
    .limit(1)
    .execute();
}

export default async function(req: Request, res: Response, next: any) {
  let accessToken: any = req.header("authorization");
  accessToken = accessToken ? accessToken.split(" ")[1] : null;
  if (!accessToken) {
    return res.sendStatus(401);
  }

  try {
    const token: any = await verifyToken(accessToken);
    if (!token) {
      throw new Error("Token invaild");
    }

    if (!moment(token.exp).isBefore()) {
      throw new Error("Token expired");
    }
    const [issueToken] = await checkIssueToken(token);
    if (!issueToken) {
      throw new Error("Token invaild");
    }
    const [user] = await User.createQueryBuilder()
      .select(["id", "firstName", "lastName", "status"])
      .where({ id: token.id })
      .limit(1)
      .execute();
    req.params.user = user;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.sendStatus(401);
  }

  next();
}
