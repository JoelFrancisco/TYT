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

  async findByEmail(email: string) {
    let db_user;
    try { 
      await this.client.connect();

      const database = this.client.db('Main');
      const users = database.collection('UserAuth');

      const query = { email: email };
      db_user = await users.findOne(query);
      console.log(db_user);
      if (db_user) {
        await client.close();
        const { name, email, password } = db_user
        const data: ICreateUserRequestDTO = { 
          name: name, 
          email: email,
          password: password
        };
        const user = new User(data);
        return user;
      } else {
        return false
      }
    } catch (err) {
      throw new Error(err.message);
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