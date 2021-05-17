import { Router } from 'express';
import { userController } from './useCases/CreateUser';

const router = Router();

router.get('/', (request, response) => {
  return response.status(200).send({ message: 'Test' });
});

router.post('/users', async (request, response) => {
  return await userController.handle(request, response);
});

export { router };
