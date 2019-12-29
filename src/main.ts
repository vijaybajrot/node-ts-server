import express, { Express } from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import cors from "cors";

import "reflect-metadata";

import UserRoutes from "./routes/users";
import AuthRoutes from "./routes/auth";
import PlaylistRoutes from "./routes/playlists";

const { PORT = 3000 } = process.env;

async function main() {
  const app: Express = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());

  try {
    await createConnection();
  } catch (error) {
    console.log("DB Not Connected");
    process.exit(0);
  }

  app.use("/auth", AuthRoutes);
  app.use("/users", UserRoutes);
  app.use("/playlists", PlaylistRoutes);

  app.listen(PORT, () => {
    console.log("server started at http://localhost:" + PORT);
  });
}

main();
