import db from '../db.js';

async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    try {
      const users = await db('users');
      return users;
    } catch (err) {
      console.error('Erreur GET /users', err);
      throw err;
    }
  });


  fastify.post('/', async (request, reply) => {
    try {
      const { name, email, password } = request.body;
      if (!name || !email || !password){
        return reply.send({ error: 'Tous les champs sont requis'});
      }
      const [user] = await db('users').insert({ name, email, password}).returning('id')
      return reply.send({ id: user.id });
    } catch (err) {
      console.error('Erreur POST /users', err);
      return reply.send({error: 'Erreur'});
    }
  });

}

export default routes;