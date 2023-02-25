const supertest = require('supertest');
const app = require('./src/server');
const request = supertest(app);

describe('Testando Rota /', () => {
  describe('Acessando rota utilizando o método get', () => {
    it('A rota deve ser possível de ser acessada e retorna um status 200', async () => {

      const response = await request.get('/');

      expect(response.status).toBe(200);

    })
  });
});