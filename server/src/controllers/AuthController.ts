import { Request, Response } from "express";
import hashPassword from "../helpers/hashPassword";

const db = require("../db/models");

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    const hashedPassword: string = await hashPassword.hash(password);

    await db.User.create({
      username,
      password: hashedPassword,
    });

    return res.send("sukses registrasi");
  };

  login(req: Request, res: Response): Response {
    return res.send("");
  }
}

export default new AuthController();
