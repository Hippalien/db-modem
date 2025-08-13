import db from '../db.js';
import argon2 from 'argon2';

async function routes (fastify) {
  fastify.get('/', async() => {
    try {
      const users = await db('users');
      return users;
    } catch (err) {
      console.error('Erreur GET /users', err);
      throw err;
    }
  });


  fastify.post('/', async (request, reply) => {
    const { name, email, password } = request.body;
    const hashedPassword = await argon2.hash(password);

    if (!name || !email || !password){
        return reply.send({ error: 'Tous les champs sont requis'});
     }

    try {
      const user = await db('users').insert({ name, email, password: hashedPassword}).returning('id')
      console.log('New user create:', user);
      return reply.send({ id: user.id });
    }

    catch (err) {
      console.error('Erreur POST /users', err);
      return reply.send({error: 'Error'});
    }
  });

}

export default routes;