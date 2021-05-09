import { User } from "../../entities/User";
import { ICreateUserRequestDTO } from "../../useCases/CreateUser/CreateUserDTO";
import { IUserRepository } from "../IUserRepository";
import { config } from "dotenv";
import { MongoClient } from "mongodb";

config()

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

class UserRepository implements IUserRepository {
  constructor(
    private client,
  ) {}

  async findByEmail(id: string) {
    let db_user;
    try { 
      await this.client.connect();

      const database = this.client.db('tyt');
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
      await this.client.connect();

      const database = this.client.db('Main');
      const users = database.collection('UserAuth');

      users.insertOne(new_user);
    } catch (err) {
      throw new Error(err.message);
    } 
  }
}

export { UserRepository }