import { Request, Response } from "express";
import DeleteUserService from "../../services/Usuarios/DeleteUserService";

export default class DeleteUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUserService = new DeleteUserService()

    await deleteUserService.execute({ id })

    return res.status(200).json({
      message: "User deleted"
    });
  }
}