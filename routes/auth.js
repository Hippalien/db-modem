import argon2 from 'argon2'

export default async function authRoutes(fastify) {
    const knex = fastify.knex

    fastify.post('/login', async (request, reply) => {
        const { email, password } = request.body
        const user = await knex('users').where({ email }).first()
        const isPasswordValid = await argon2.verify(user.password, password)

        if (!user) {
            reply.code(401)
            return { error: 'Identifiants invalides' }
          }

        if (!isPasswordValid) {
            reply.code(401)
            return { error: 'Mot de passe incorrect' }
          }

        else {
            request.session.user = {
              id: user.id,
              name: user.name,
              email: user.email
            }
            return { message: 'Connexion réussie' }
          }
  })

  fastify.get('/user', async (request, reply) => {
    if (request.session.user) {
      return { user: request.session.user }
    } else {
      reply.code(401)
      return { error: 'Non connecté' }
    }
  })

  fastify.post('/logout', async (request, reply) => {
    try {
      await request.session.destroy()
      reply.send({ message: 'Déconnecté' })
    } catch (err) {
      reply.code(500)
      reply.send({ error: 'Erreur lors de la déconnexion' })
    }
  })
  
  fastify.get('/', async (request, reply) => {
    if (!request.session.user) {
      reply.code(401)
      return { error: 'Accès interdit' }
    }
  })
}

