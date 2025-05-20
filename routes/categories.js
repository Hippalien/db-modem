import categories from '../data/categories.js';

async function routes (fastify, options) {
  fastify.get('/categories', async (request, reply) => {
    request.log.info('GET /categories')
    console.log('GET /categories')
    return categories
    })
}

export default routes;
