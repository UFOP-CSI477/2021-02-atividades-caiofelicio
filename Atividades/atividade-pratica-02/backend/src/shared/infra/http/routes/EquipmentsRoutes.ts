import { Router } from 'express';
import CreateEquipmentController from '../../../../modules/controllers/Equipamentos/CreateEquipmentController';
import DeleteEquipmentController from '../../../../modules/controllers/Equipamentos/DeleteEquipmentController';
import ReadEquipmentByIdController from '../../../../modules/controllers/Equipamentos/ReadEquipmentByIdController';
import ReadEquipmentsController from '../../../../modules/controllers/Equipamentos/ReadEquipmentsController';
import UpdateEquipmentController from '../../../../modules/controllers/Equipamentos/UpdateEquipmentController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const equipmentsRoutes = Router();

const createEquipmentController = new CreateEquipmentController();
const readEquipmentsController = new ReadEquipmentsController();
const readEquipmentByIdController = new ReadEquipmentByIdController();
const deleteEquipmentController = new DeleteEquipmentController();
const updateEquipmentController = new UpdateEquipmentController();

equipmentsRoutes.post(
  '/new',
  ensureAuthenticated,
  ensureAdmin,
  createEquipmentController.handle
);
equipmentsRoutes.get('/', readEquipmentsController.handle);
equipmentsRoutes.get('/:id', readEquipmentByIdController.handle);
equipmentsRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  updateEquipmentController.handle
);
equipmentsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteEquipmentController.handle
);

export default equipmentsRoutes;
