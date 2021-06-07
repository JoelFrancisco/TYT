import bcrypt from 'bcryptjs';

import { IHashPassword } from '../IHashPassword';

export class BcryptHashPassword implements IHashPassword {
  async hash(value: string) {
    const hashedValue = await bcrypt.hash(value, 10);
    return hashedValue;
  }
  
  async checkHash(receivedValue: string, storedValue) {
    const answer = await bcrypt.compare(
      receivedValue, 
      storedValue
    )
    ? true : false;
    return answer;
  }
}

