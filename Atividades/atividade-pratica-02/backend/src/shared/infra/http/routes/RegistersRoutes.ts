import { Router } from 'express';
import CreateRegisterController from '../../../../modules/controllers/Registros/CreateRegisterController';
import DeleteRegisterController from '../../../../modules/controllers/Registros/DeleteRegisterController';
import ReadRegisterByIdController from '../../../../modules/controllers/Registros/ReadRegisterByIdController';
import ReadRegistersByIdController from '../../../../modules/controllers/Registros/ReadRegistersByIdController';
import ReadRegistersController from '../../../../modules/controllers/Registros/ReadRegistersController';
import UpdateRegisterController from '../../../../modules/controllers/Registros/UpdateRegisterController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const registersRoutes = Router();

const createRegisterController = new CreateRegisterController();
const readRegistersController = new ReadRegistersController();
const readRegisterByIdController = new ReadRegisterByIdController();
const readRegistersByIdController = new ReadRegistersByIdController();
const updateRegisterController = new UpdateRegisterController();
const deleteRegisterController = new DeleteRegisterController();

registersRoutes.post(
  '/new',
  ensureAuthenticated,
  ensureAdmin,
  createRegisterController.handle
);
registersRoutes.get('/', readRegistersController.handle);
registersRoutes.get('/:id', readRegisterByIdController.handle);
registersRoutes.get('/:id/all', readRegistersByIdController.handle);
registersRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  updateRegisterController.handle
);
registersRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteRegisterController.handle
);

export default registersRoutes;
