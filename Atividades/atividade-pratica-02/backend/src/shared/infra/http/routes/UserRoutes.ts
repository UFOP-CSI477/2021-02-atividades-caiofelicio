import { Router } from "express";
import CreateUserController from "../../../../modules/controllers/Usuarios/CreateUserController";
import DeleteUserController from "../../../../modules/controllers/Usuarios/DeleteUserController";
import ReadUserByIdController from "../../../../modules/controllers/Usuarios/ReadUserByIdController";
import ReadUsersController from "../../../../modules/controllers/Usuarios/ReadUsersController";
import UpdateUserController from "../../../../modules/controllers/Usuarios/UpdateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createUserController = new CreateUserController()
const readUsersController = new ReadUsersController()
const readUserByIdController = new ReadUserByIdController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

const userRoutes = Router();

userRoutes.post("/new", createUserController.handle);
userRoutes.get("/", readUsersController.handle);
userRoutes.get("/:id", readUserByIdController.handle);
userRoutes.put("/:id", ensureAuthenticated, updateUserController.handle);
userRoutes.delete("/:id", ensureAuthenticated, deleteUserController.handle);

export default userRoutes;