import { Request, Response } from "express";
import IController from "./ControllerInterface";

const db = require("../db/models");

class TodoController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.app.locals.credential;
    const todos = await db.Todo.findAll({
      where: { user_id: id },
    });
    return res.status(200).json({
      data: todos,
    });
  };

  create = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.app.locals.credential;
    const { description } = req.body;

    const todo = await db.Todo.create({
      user_id: id,
      description,
      status: "To-do",
    });

    return res.status(201).json({
      data: todo,
      message: "sukses create todo",
    });
  };
  show = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;

    const todo = await db.Todo.findOne({
      where: {
        id,
        user_id,
      },
    });

    return res.status(200).json({
      data: todo,
    });
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;
    const { description, status } = req.body;

    await db.Todo.update(
      {
        description,
        status,
      },
      {
        where: {
          id,
          user_id,
        },
      }
    );

    return res.status(201).json({
      message: "updated todo",
    });
  };

  updateStatus = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;
    const { status } = req.body;

    await db.Todo.update(
      {
        status,
      },
      {
        where: {
          id,
          user_id,
        },
      }
    );

    return res.status(201).json({
      message: "updated todo",
    });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;

    await db.Todo.destroy({
      where: {
        id,
        user_id,
      },
    });

    return res.status(201).json({
      message: "deleted todo",
    });
  };
}

export default new TodoController();
