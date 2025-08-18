import argon2 from 'argon2'


export const requireAuth = async (request, reply) => {
  if (!request.session.user) {
    reply.code(401)
    throw new Error('Authentification requise')
  }
}


export default async function authRoutes(fastify) {
    const knex = fastify.knex

    fastify.post('/login', async (request, reply) => {
      const { email, password } = request.body
      
      try {
        const user = await knex('users').where({ email }).first()
        
        if (!user) {
          reply.code(401)
          return { error: 'Identifiants invalides' }
        }
        
        const isPasswordValid = await argon2.verify(user.password, password)
        
        if (!isPasswordValid) {
          reply.code(401)
          return { error: 'Identifiants invalides' } 
        }
        
        request.session.user = {
          id: user.id,
          name: user.name,
          email: user.email
        }
        
        return { message: 'Connexion réussie' }
        
      } catch (err) {
        console.error('Erreur login:', err)
        reply.code(500)
        return { error: 'Erreur serveur' }
      }
    })
 

  fastify.get('/user', async (request, reply) => {
    if (request.session.user) {
      return { user: request.session.user }
    } else {
      reply.code(401)
      return { error: 'Logout' }
    }
  })

  fastify.post('/logout', async (request, reply) => {
    try {
      await request.session.destroy()
      reply.send({ message: 'Logout' })
    } catch (err) {
      reply.code(500)
      reply.send({ error: 'Error during login' })
    }
  })
  
  fastify.get('/', async (request, reply) => {
    if (!request.session.user) {
      reply.code(401)
      return { error: 'Access forbiden' }
    }
  })


}

