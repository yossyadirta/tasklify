import { Request } from "express";
const db = require("../db/models");

class TodoService {
  credential: {
    id: number;
  };
  body: Request["body"];
  params: Request["params"];

  constructor(req: Request) {
    this.credential = req.app.locals.credential;
    this.body = req.body;
    this.params = req.params;
  }

  getAll = async () => {
    const todos = await db.Todo.findAll({
      where: {
        user_id: this.credential.id,
      },
    });
    return todos;
  };

  store = async () => {
    const { description } = this.body;

    const todo = await db.Todo.create({
      user_id: this.credential.id,
      description,
      status: "To-do",
    });

    return todo;
  };

  getOne = async () => {
    const { id } = this.params;
    const todo = await db.Todo.findOne({
      where: {
        id,
        user_id: this.credential.id,
      },
    });

    return todo;
  };

  update = async () => {
    const { id } = this.params;
    const { description, status } = this.body;

    const todo = await db.Todo.update(
      {
        description,
        status,
      },
      {
        where: {
          id,
          user_id: this.credential.id,
        },
      }
    );

    return todo;
  };

  updateStatus = async () => {
    const { id } = this.params;
    const { status } = this.body;

    const todo = await db.Todo.update(
      {
        status,
      },
      {
        where: {
          id,
          user_id: this.credential.id,
        },
      }
    );

    return todo;
  };

  delete = async () => {
    const { id } = this.params;

    const todo = await db.Todo.destroy({
      where: {
        id,
        user_id: this.credential.id,
      },
    });

    return todo;
  };
}

export default TodoService;
