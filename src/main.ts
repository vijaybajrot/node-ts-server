import express from "express";
import { Express, Request, Response } from "express";
import * as bodyParser from "body-parser";
import { log } from "@app/utils";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";

const app: Express = express();
const { PORT = 3000 } = process.env;

log("another message");
app.use(bodyParser.json());

createConnection()
  .then(connection => {
    console.log("DB Connected");
  })
  .catch(err => {
  	throw err;
    console.log("DB Not Connected");
    process.exit(0);
  });

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "hello world"
  });
});

app.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT);
});
