import { User } from "../../entities/User";
import { ICreateUserRequestDTO } from "../../useCases/CreateUser/CreateUserDTO";
import { IUserRepository } from "../IUserRepository";

const { MongoClient } = require('mongodb');
const uri = "";
const client = new MongoClient(uri);

class UserRepository implements IUserRepository {
  constructor(
    private client,
    private database
  ) {}

  async findByEmail(id: string) {
    let db_user;
    try { 
      await client.connect();

      const database = client.db('tyt');
      const users = database.collection('users');

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
    await client.connect();

    const database = client.db('tyt');
    const users = database.collection('users');

    users.insertOne(new_user);
  }
}

