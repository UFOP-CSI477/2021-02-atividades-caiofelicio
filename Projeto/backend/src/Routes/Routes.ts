import { Router } from "express";
import AuthController from "../Controllers/Auth/AuthController";
import petRoutes from "./Pet.Routes";
import userRoutes from "./User.Routes";

const Routes = Router()

Routes.use("/login", AuthController.handle)
Routes.use("/users", userRoutes)
Routes.use("/pets", petRoutes)

export default Routes