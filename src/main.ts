require("dotenv").config();
import "reflect-metadata";
import express, { Express } from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import cors from "cors";
import { useExpressServer } from "routing-controllers";

import { isProduction } from "./utils";

const { PORT = 3000 } = process.env;

async function main() {
  const app: Express = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());

  try {
    await createConnection();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("DB Not Connected");
    process.exit(0);
  }

  useExpressServer(app, {
    controllers: isProduction()
      ? [__dirname + "/controllers/*.js"]
      : [__dirname + "/controllers/*.ts"]
  });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log("server started at http://localhost:" + PORT);
  });
}

main();
