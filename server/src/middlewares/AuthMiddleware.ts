import { Request, Response, NextFunction } from "express";
import Authentication from "../helpers/Authentication";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.headers.authorization) {
    return res.status(401).send("no token");
  }

  const access_token: string = req.headers.authorization.split(" ")[1];

  try {
    const credential: string | object =
      Authentication.verifyToken(access_token);

    if (credential) {
      req.app.locals.credential = credential;
      return next();
    } else {
      return res.send("Invalid token");
    }
  } catch (error) {
    res.send(error);
  }
};
