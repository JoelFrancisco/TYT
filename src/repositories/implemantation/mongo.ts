import { User } from "../../entities/User";
import { ICreateUserRequestDTO } from "../../useCases/CreateUser/CreateUserDTO";
import { IUserRepository } from "../IUserRepository";
import { config } from "dotenv";
config()
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

class UserRepository implements IUserRepository {
  constructor(
    private client,
  ) {}

  async findByEmail(id: string) {
    let db_user;
    try { 
      await client.connect();

      const database = client.db('tyt');
      const users = database.collection('UserAuth');

      const query = { id: id };
      db_user = await users.findOne(query);
    } finally {
      await client.close();
      const data: ICreateUserRequestDTO = { 
        name: db_user[0].name,
        email: db_user[0].email,
        password: db_user[0].password
      };
      const user = new User(data, db_user[0].id);
      return user;
    } 
  }

  async save(new_user: User) {
    try {
      await client.connect();
    } catch (err) {
      throw new Error(err.message);
    }

    const database = client.db('tyt');
    const users = database.collection('UserAuth');

    users.insertOne(new_user);
  }
}

export { UserRepository }