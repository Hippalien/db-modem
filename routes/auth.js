import argon2 from 'argon2'


export const requireAuth = async (request, reply) => {
  if (!request.session.user) {
    console.log('Session utilisateur manquante :', request.session); // Log pour déboguer
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

  fastify.patch('/update', {
    preHandler: [requireAuth]
  }, async (request, reply) => {
    console.log('Corps complet de la requête:', JSON.stringify(request.body, null, 2));

    const { name, email, currentPassword, newPassword } = request.body;
    const userId = request.session.user.id;
  
    
    if (!currentPassword) {
      return reply.status(400).send({ error: 'Current password is required' });
    }
    try {
    if (!currentPassword) {
        return reply.status(400).send({ error: 'Current password is required' });
      }

      const user = await knex('users').where({ id: userId }).first('password');
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      const isValidPassword = await argon2.verify(user.password, currentPassword);
      if (!isValidPassword) {
        return reply.status(401).send({ error: 'Current password is incorrect' });
      }

      const updates = {};
      if (name !== '') { 
        updates.name = name; 
      }
      if (email !== '') { 
        updates.email = email; 
      }
      if (newPassword !== undefined && newPassword !== null && newPassword !== '') {
        updates.password = await argon2.hash(newPassword);
      } 

      if (Object.keys(updates).length === 0) {
        return reply.status(400).send({ error: 'At least one field (name, email, or new password) must be provided for update' });
      }
      updates.updated_at = new Date();
      await knex('users').where({ id: userId }).update(updates);

      if (updates.name) {
        request.session.user.name = updates.name;
      }
      if (updates.email) {
        request.session.user.email = updates.email;
      } 

      console.log('maj reussie');
      return reply.send({ message: 'User updated successfully' });
    } catch (err) {
      console.error('Erreur PATCH /update', err);
      return reply.status(500).send({ error: 'Error updating user' });
    }
  });

}

