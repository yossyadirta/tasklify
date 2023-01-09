import { Request, Response } from "express";
import IController from "./ControllerInterface";

class TodoController implements IController {
  index(req: Request, res: Response): Response {
    return res.send("get todo");
  }
  create(req: Request, res: Response): Response {
    return res.send("create todo sukses");
  }
  show(req: Request, res: Response): Response {
    return res.send("");
  }
  update(req: Request, res: Response): Response {
    return res.send("update sukses");
  }
  delete(req: Request, res: Response): Response {
    return res.send("delete todo sukses");
  }
}

export default new TodoController();
