import { Router } from "express"
import CreateUserController from "../Controllers/User/CreateUserController"
import ReadUserByIdController from "../Controllers/User/ReadUserByIdController"
import UpdateUserController from "../Controllers/User/UpdateUserController"
import { ensureAuthenticated } from "../middlewares/ensureAuthtenticated"
import multerConfig from "../utils/multerConfig"

const userRoutes = Router()

userRoutes.post("/new", CreateUserController.handle)
userRoutes.put("/update", ensureAuthenticated, multerConfig.single("image"), UpdateUserController.handle)
userRoutes.get("/:id", ReadUserByIdController.handle)

export default userRoutes