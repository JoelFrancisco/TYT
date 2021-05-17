import { MongoClient } from 'mongodb';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { UserRepository } from '../../repositories/implementation/MongoDBUsersRepository';
import { BcryptHashPassword } from '../../services/Hash/implementation/BcryptHashPassword';
import { config } from 'dotenv';

config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userRepository = new UserRepository(client);
const hashPassword = new BcryptHashPassword();
const userUseCase = new CreateUserUseCase(userRepository, hashPassword);
const userController = new CreateUserController(userUseCase);

export { userController };
