import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
class UserRepository implements IUserRepository {
  constructor(
    private client,
  ) {}

  async findByEmail(email: string) {
    try { 
      await this.client.connect();

      const database = this.client.db('Main');
      const users = database.collection('UserAuth');

      const query = { email: email };
      const db_user = await users.findOne(query);
      console.log(db_user);
      if (db_user) {
        await this.client.close();
        const { name, email, password } = db_user
        const user = new User({ 
          name: name, 
          email: email, 
          password: password
        });
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
      await this.client.close();
    } catch (err) {
      throw new Error(err.message);
    } 
  }
}

export { UserRepository }