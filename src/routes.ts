import { Router } from "express"
import { MongoClient } from "mongodb";
import { CreateUserController } from './useCases/CreateUser/CreateUserController'
import { CreateUserUseCase } from './useCases/CreateUser/CreateUserUseCase'
import { UserRepository } from './repositories/implemantation/mongo'

const router = Router()

router.get('/', (request, response) => {
    return response.status(200).send({"message": "Test"});
})

router.post('/users', async (request, response) => {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const userRepository = new UserRepository(client);
    const userUseCase = new CreateUserUseCase(userRepository);
    const userController = new CreateUserController(userUseCase);
    await userController.handle(request, response);
    
    return response.status(201).send();
})

export { router }