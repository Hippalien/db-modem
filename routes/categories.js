import db from '../db.js';

async function routes (fastify, options) {
fastify.get('/', async (request, reply) => {
    try {
      const categories = await db('categories');
      return categories;
    } catch (err) {
      console.error('Erreur GET /');
    }
});
}

export default routes;