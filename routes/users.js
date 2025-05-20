import users from '../data/users.js';

async function routes (fastify, options) {
  fastify.get('/users', async (request, reply) => {
    request.log.info('GET /users')
    console.log('GET /users')
    return users
    })
}

export default routes;
