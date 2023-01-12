import { Request, Response } from "express";

interface IController {
  index(req: Request, res: Response): Response | Promise<Response>; //list data
  create(req: Request, res: Response): Response | Promise<Response>; //membuat
  show(req: Request, res: Response): Response | Promise<Response>; // menampilkan satu data
  update(req: Request, res: Response): Response | Promise<Response>;
  delete(req: Request, res: Response): Response | Promise<Response>;
}

export default IController;
