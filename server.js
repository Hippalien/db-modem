// ESM
import Fastify from 'fastify'
import cors from '@fastify/cors'
import articles from './routes/articles.js'
import categories from './routes/categories.js'
import users from './routes/users.js'
import 'dotenv/config.js'

const fastify = Fastify({
  logger: true
})

await fastify.register(cors, {
  origin: ['http://localhost:3000', 'http://127.0.1:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] 
})

fastify.get('/', async (request, reply) => {
  return { hello: 'Hello Paris' }
})

fastify.register(articles, { prefix: '/api/articles'})
fastify.register(categories, { prefix: '/api/categories' })
fastify.register(users, { prefix: '/api/users' })



async function runServer(){
  try {
    await fastify.listen({ port: 1234 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

runServer()
