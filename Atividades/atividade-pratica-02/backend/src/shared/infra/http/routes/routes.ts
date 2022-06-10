import userRoutes from "./UserRoutes";
import { Request, Response, Router } from "express";
import AuthController from "../../../../modules/controllers/Autenticaticao/AuthController";
import equipmentsRoutes from "./EquipmentsRoutes";
import registersRoutes from "./RegistersRoutes";
import { seeder } from "../../../../utils/seed";

const routes = Router();

const authController = new AuthController()

// auth route
routes.post("/login", authController.handle);

routes.use("/users", userRoutes);
routes.use("/equipments", equipmentsRoutes)
routes.use("/registers", registersRoutes)

routes.get("/seed", (req: Request, res: Response) => {
  seeder()
  return res.status(200).json({ message: "Seeded" })
})

routes.use((req: Request, res: Response) => {
  return res.status(404).json({
    error: "Route not found",
    status: 404
  });
})

export default routes;