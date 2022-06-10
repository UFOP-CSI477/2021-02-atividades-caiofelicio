import { Request, Response } from "express"
import DeleteRegisterService from "../../services/Registros/DeleteRegisterService";


export default class DeleteRegisterController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteRegisterService = new DeleteRegisterService();

    await deleteRegisterService.execute({ id });

    return res.status(200).json({ message: "Register deleted successfully" });

  }
}