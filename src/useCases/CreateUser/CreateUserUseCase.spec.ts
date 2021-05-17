import request from 'supertest';
import { app } from '../../app';

const generateRandomNumber = () => {
  return Math.random() * (1000 - 1) + 1;
};

describe('Register', () => {
  it('Should return 201 when user created', async () => {
    const randomNumber = generateRandomNumber();

    const response = await request(app)
      .post('/users')
      .send({
        name: 'teste2',
        email: `test${randomNumber}@gmail.com`,
        password: 'teste',
      });

    expect(response.status).toBe(201);
  });
});
