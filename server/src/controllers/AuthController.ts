import { Request, Response } from "express";
import Authentication from "../helpers/Authentication";

const db = require("../db/models");

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    const hashedPassword: string = await Authentication.hashPassword(password);

    await db.User.create({
      username,
      password: hashedPassword,
    });

    return res.send("sukses registrasi");
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    const user = await db.User.findOne({
      where: { username },
    });

    //check password
    if (user) {
      let compare = await Authentication.comparePassword(
        password,
        user.password
      );

      if (compare) {
        let access_token = Authentication.generateToken(
          user.id,
          username,
          user.password
        );
        return res.send({
          access_token,
        });
      }
    }
    return res.send("email/password salah");
  };

  profile = async (req: Request, res: Response): Promise<Response> => {
    return res.send(req.app.locals.credential);
  };
}

export default new AuthController();
