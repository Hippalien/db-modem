import argon2 from 'argon2'

export default async function authRoutes(fastify, opts) {
    const knex = fastify.knex

    fastify.post('/login', async (request, reply) => {
        const { username, password } = request.body

        const user = await knex('users').where({ username }).first()
        if (!user) {
            reply.code(401)
            return { error: 'Identifiants invalides' }
          }
          const isPasswordValid = await argon2.verify(user.password, password)

          if (!isPasswordValid) {
            reply.code(401)
            return { error: 'Mot de passe incorrect' }
          }
          request.session.user = {
            id: user.id,
            username: user.username
          }
          return { message: 'Connexion réussie' }
  })
  fastify.get('/me', async (request, reply) => {
    if (request.session.user) {
      return { user: request.session.user }
    } else {
      reply.code(401)
      return { error: 'Non connecté' }
    }
  })
  fastify.post('/logout', async (request, reply) => {
    request.destroySession((err) => {
      if (err) {
        reply.code(500)
        return { error: 'Erreur lors de la déconnexion' }
      }
      reply.send({ message: 'Déconnecté' })
    })
  })
  fastify.get('/dashboard', async (request, reply) => {
    if (!request.session.user) {
      reply.code(401)
      return { error: 'Accès interdit' }
    }

    return { message: `Bienvenue ${request.session.user.username}` }
  })
}

