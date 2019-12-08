import express, { Express } from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";

import "reflect-metadata";

import UserRoutes from "./routes/users";

const { PORT = 3000 } = process.env;

async function main() {
  const app: Express = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  try {
    await createConnection();
  } catch (error) {
    console.log("DB Not Connected");
    process.exit(0);
  }

  app.use("/users", UserRoutes);

  app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
  });
}

main();
