import { Request, Response } from "express";
import IController from "./ControllerInterface";
import TodoService from "../services/TodoService";

class TodoController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);

    const todos = await services.getAll();

    return res.status(200).json({
      data: todos,
    });
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);

    const todo = await services.store();

    return res.status(201).json({
      data: todo,
      message: "sukses create todo",
    });
  };
  show = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);

    const todo = await services.getOne();

    return res.status(200).json({
      data: todo,
    });
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);

    const todo = await services.update();

    return res.status(201).json({
      message: "updated todo",
    });
  };

  updateStatus = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);

    await services.updateStatus();

    return res.status(201).json({
      message: "updated todo",
    });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const services: TodoService = new TodoService(req);

    await services.delete();

    return res.status(201).json({
      message: "deleted todo",
    });
  };
}

export default new TodoController();
