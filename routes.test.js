const supertest = require('supertest');
const app = require('./src/server');
const request = supertest(app);
const db = require('./src/database/db');
const User = require('./src/models/User');

describe('GET /', () => {
  describe('Testando a Rota', () => {
    it('Responder com status 200', async () => {
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

describe('POST /adduser', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  describe('Testando a Rota', () => {
    it('Responder com status 201', async () => {
      const novoUsuario = {
        name: 'Ronald',
        age: 23,
        email: 'ronald@email.com'
      }
      const response = await request.post('/adduser').send(novoUsuario);

      expect(response.status).toBe(201);
    });

    it('Deve adicionar um novo usuário', async () => {
      const novoUsuario = {
        name: 'Chris',
        age: 23,
        email: 'chris@email.com'
      }
      const response = await request.post('/adduser').send(novoUsuario);
  
      const usuarioAdicionado = await User.findOne({ where: { email: novoUsuario.email } });
      expect(usuarioAdicionado).toBeTruthy();
    });

    it('Deve retornar uma resposta JSON', async () => {
      const novoUsuario = {
        name: 'Felipe',
        age: 23,
        email: 'felipe@email.com'
      }
      const response = await request.post('/adduser').send(novoUsuario);
      expect(response.type).toBe('application/json');
    });
  });
});

describe('PUT /edituser',  () => {
  beforeAll(async () => {
    const novoUsuario = {
      name: 'Felipe',
      age: 23,
      email: 'felipe@email.com'
    }
    
    const tryFindNewUser = await User.findOne({
      where : {
        email: 'felipe@email.com' 
      }
    });

    if(!tryFindNewUser){
      await User.create(novoUsuario);
    }

  });
  describe('Testando a Rota', () => {

    it('Responder com status 200', async () => {
      const novoUsuario = {
        name: 'Felipe',
        age: 23,
        email: 'felipe@email.com'
      }
      const tryFindNewUser = await User.findOne({
        where : {
          email: 'felipe@email.com' 
        }
      });
      const response = await request.put('/edituser/' + tryFindNewUser.userId).send(novoUsuario);
      expect(response.status).toBe(200);
    });

    it('Deve editar um usuário', async () => {
      const novoUsuario = {
        name: 'Felipe',
        age: 30,
        email: 'felipe@email.com'
      }
      const tryFindNewUser = await User.findOne({
        where : {
          email: 'felipe@email.com' 
        }
      });
      
      const response = await request.put('/edituser/' + tryFindNewUser.userId).send(novoUsuario);

      const tryFindEditedUser = await User.findOne({
        where: {
          email: 'felipe@email.com',
          age: 30
        }
      })
      
      expect(response.status).toBe(200);
      expect(tryFindEditedUser).toBeTruthy();
    });

  });
});

describe('DELETE /deleteuser', () => {
  describe('Testando a Rota', () => {
    it('Deve remover um usuário', async () => {
      const tryFindNewUser = await User.findOne({
        where : {
          email: 'felipe@email.com' 
        }
      });

      const response = await request.delete('/deleteuser/' + tryFindNewUser.userId)
      await expect(User.findOne({ where: { name: 'Felipe' } })).resolves.toBe(null);
    });  
  });
});