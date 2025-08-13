import db from '../db.js';

async function routes (fastify, options) {

  fastify.get('/', async (request, reply) => {
    try {
      const categories = await db('categories').orderBy('name', 'asc');
      return categories;
    } catch (err) {
      console.error('Erreur GET /', err);
      return reply.status(500).send({ error: 'Erreur serveur' });
    }
  });

  fastify.post('/', async (request, reply) => {
    const { name } = request.body;
   
    try {
      if (!name || typeof name !== 'string') {
        return reply
          .status(400)
          .send({ error: 'Le nom de la catégorie est requis et doit être une chaîne de caractères' });
      }

      const id = await db('categories').insert({ name }).returning('id');
      return reply.status(201).send({ id });
    } catch (err) {
      console.error('Erreur POST /', err);
      return reply.status(500).send({ error: 'Erreur lors de la création de la catégorie' });
    }
  });

  fastify.patch('/:id', async (request, reply) => {
    const { id } = request.params;
    const { name } = request.body;

    try {
      if (!name || typeof name !== 'string') {
        return reply
          .status(400)
          .send({ error: 'Le nom de la catégorie est requis et doit être une chaîne de caractères' });
      }

      const updatedRows = await db('categories').where({ id }).update({ name });

      if (updatedRows === 0) {
        return reply.status(404).send({ error: 'Catégorie non trouvée' });
      } else {
        return reply.status(200).send({ message: 'Catégorie mise à jour avec succès' });
      }

    
    } catch (err) {
      console.error('Erreur PATCH /:id', err);
      return reply.status(500).send({ error: 'Erreur lors de la mise à jour de la catégorie' });
    }
  });

}

export default routes;