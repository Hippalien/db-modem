import db from '../db.js';

async function routes (fastify, options) {
  fastify.get('/users', async (request, reply) => {
    try {
      const users = await db('users');
      return users;
    } catch (err) {
      console.error('Erreur GET /users', err);
      throw err;
    }
  });
}

export default routes;