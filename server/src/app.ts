import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { config as dotenv } from "dotenv";

import UserRoutes from "./router/UserRoutes";
import AuthRoutes from "./router/AuthRoutes";
import TodoRoutes from "./router/TodoRoutes";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    if (process.env.NODE_ENV !== "production") {
      dotenv();
    }
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Ini adalah route menggunakan TS");
    });

    this.app.use("/api/v1/users", UserRoutes);
    this.app.use("/api/v1/auth", AuthRoutes);
    this.app.use("/api/v1/todos", TodoRoutes);
  }
}

const port: string | number = process.env.PORT || 8000;

const app = new App().app;
app.listen(port, () => {
  console.log("Port: " + port);
});
