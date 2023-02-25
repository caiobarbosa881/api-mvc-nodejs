const supertest = require('supertest');
const app = require('./src/server');
const request = supertest(app);

describe('GET /', () => {
  describe('Testando Rotas', () => {
    it('Deve Retornar o Status HTTP 200', async () => {
      const response = await request.get('/'); 
      expect(response.status).toBe(200);
    });

    it('Retorna um array userData', async () => {
      const response = await request.get('/'); 
      expect(Array.isArray(response.body.userData)).toBe(true);
    });

    it('Deve retornar uma resposta JSON', async () => {
      const response = await request.get('/'); 
      expect(response.type).toBe('application/json');
    });
  });
});