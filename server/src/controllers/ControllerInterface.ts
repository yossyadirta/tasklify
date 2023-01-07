import { Request, Response } from "express";

interface IController {
  index(req: Request, res: Response): Response; //list data
  create(req: Request, res: Response): Response; //membuat
  show(req: Request, res: Response): Response; // menampilkan satu data
  update(req: Request, res: Response): Response;
  delete(req: Request, res: Response): Response;
}

export default IController;
