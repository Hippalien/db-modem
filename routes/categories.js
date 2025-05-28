import categories from '../data/categories.js';

async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    request.log.info('GET /api/categories')
    console.log('GET /api/categories')
    return categories
    })
}

export default routes;
