import db from '../db.js';
import argon2 from 'argon2';

async function routes (fastify) {
  fastify.get('/', async() => {
    try {
      const users = await db('users');
      return users;
    } catch (err) {
      console.error('Erreur GET /users', err);
      throw err;
    }
  });

  fastify.patch('/:id', async (request, reply) => {
    const { id } = request.params;
    const { name, email, password } = request.body; 

    if (!name && !email && !password) {
      return reply.send({ error: 'Minimum one field is required to update' });
    }

    const dataToUpdate = {};
    if (name) dataToUpdate.name = name;
    if (email) dataToUpdate.email = email;
    if (password) dataToUpdate.password = await argon2.hash(password);

    try {
      const updatedUser = await db('users').where({ id }).update(dataToUpdate);
      if (updated === 0) {
        return reply.status(404).send({ error: 'User not found' });
      }
      else {
        return reply.send({ message: 'User updated successfully' });
      }
    } catch (err) {
      console.error('Erreur PATCH /:id', err);
      return reply.status(500).send({ error: 'Error updating user' });
    }
  });


  fastify.post('/', async (request, reply) => {
    const { name, email, password } = request.body;
    const hashedPassword = await argon2.hash(password);

    if (!name || !email || !password){
        return reply.send({ error: 'Tous les champs sont requis'});
     }

    try {
      const user = await db('users').insert({ name, email, password: hashedPassword}).returning('id')
      console.log('New user create:', user);
      return reply.send({ id: user.id });
    }

    catch (err) {
      console.error('Erreur POST /users', err);
      return reply.send({error: 'Error'});
    }
  });

}

export default routes;