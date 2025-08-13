// ESM
import Fastify from 'fastify'
import cors from '@fastify/cors'
import articles from './routes/articles.js'
import categories from './routes/categories.js'
import users from './routes/users.js'
import auth from './routes/auth.js'
import fastifyCookie from '@fastify/cookie'
import fastifySession from '@fastify/session'
import formbody from '@fastify/formbody'
import knex from './db.js'
import 'dotenv/config.js'


const fastify = Fastify({
  logger: true
})

fastify.decorate('knex', knex);

await fastify.register(cors, {
  origin: ['http://localhost:3000', 'http://127.0.1:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], 
  credentials: true
})

await fastify.register(formbody)
await fastify.register(fastifyCookie)
await fastify.register(fastifySession, {
  secret: 's}aAW-9!l$<@Uca/O)a79?>9tq@dNAu_',
  cookieName: 'sessionId',
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 30 * 60 * 1000,
  }
})


fastify.register(articles, { prefix: '/api/articles'})
fastify.register(categories, { prefix: '/api/categories' })
fastify.register(users, { prefix: '/api/users' })
fastify.register(auth, { prefix: '/api/auth' })

fastify.get('/', async (request, reply) => {
  if (!request.session.user) {
    reply.code(401)
    return { error: 'Non connecté' }
  }

  return { message: request.session.user.name  }
})

async function runServer(){
  try {
    await fastify.listen({ port: 1234 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}


runServer()
