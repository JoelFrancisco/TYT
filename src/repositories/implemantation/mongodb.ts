import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  constructor(
    private client,
    private database
  ) {}

  async function findByEmail(id: string) {
    let db_user;
    try { 
      await client.connect();

      const database = client.db('tyt');
      const users = database.collection('users');

      const query = { id: id };
      db_user = await users.findOne(query);
    } finally {
      await client.close();
      const user = new User(db_user[0].id, db_user[0].name, db_user[0].email, db_user[0].password);
      return user;
    } 
  }
}

const { MongoClient } = require('mongodb');

const uri = "";

const client = new MongoClient(uri);


async function save(new_user: User) {
  await client.connect();

  const database = client.db('tyt');
  const users = database.collection('users');

  users.insertOne(new_user);
}
