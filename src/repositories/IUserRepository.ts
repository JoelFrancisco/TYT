import { User } from '../entities/User/User';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | boolean>;
  save(user: User): Promise<void>;
}
