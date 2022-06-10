import { Router } from "express"
import CreatePetController from "../Controllers/Pet/CreatePetController"
import ReadPetByIdController from "../Controllers/Pet/ReadPetByIdController"
import ReadPetsController from "../Controllers/Pet/ReadPetsController"
import UpdatePetController from "../Controllers/Pet/UpdatePetController"
import { ensureAuthenticated } from "../middlewares/ensureAuthtenticated"
import multerConfig from "../utils/multerConfig"

const petRoutes = Router()

petRoutes.post("/new", ensureAuthenticated, multerConfig.array("images", 3), CreatePetController.handle)
petRoutes.put("/update/:id", ensureAuthenticated, UpdatePetController.handle)
petRoutes.get("/", ReadPetsController.handle)
petRoutes.get("/:id", ReadPetByIdController.handle)

export default petRoutes
