import db from '../db.js';

async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
   try {
    const articles = await db('articles').orderBy('created_at', 'desc');
    return articles;
   } catch (err) {
    console.error('Erreur GET /articles', err);
   }
  });

fastify.get('/highlights', async (request, reply) => {
  try {
    const articles = await db('articles').limit(3);
    return articles;
   } catch (err) {
    console.error('Erreur GET /articles', err);
   }
  });

fastify.get('/:id', async (request, reply) => {
  const { id } = request.params;
  try {
    const article = await db('articles').where({ id }).first();
    if (!article) {
      console.error('Article non trouvé');
    } else {
      return article;
    }
  } catch (err) {
    console.error('Erreur GET /:id', err);
  }
});

fastify.post('/', async (request, reply) => {
  try {
    const { title, status, image, content } = request.body;
    if (!title || !status || !image || !content){
      return reply.send({ error: 'Tous les champs sont requis'});
    }
    if (
      typeof title !== 'string' ||
      typeof status !== 'string' ||
      typeof image !== 'string' ||
      typeof content !== 'string'
    ) {
      return reply.send({ error: 'Les champs doivent être des chaînes de caractères' });
    }
    const [id] = await db('articles').insert({ title, status, image, content}).returning('id')
    return reply.send({ id });
  } catch (err) {
    console.error('Erreur POST /articles', err);
    return reply.send({error: 'Erreur'});
  }
});

fastify.delete('/:id', async (request, reply) => {
const { id } = request.params
try {
  const deleted = await db('articles').where({ id }).del()
  if (deleted === 0){
    return reply.send({error: 'Article non trouvé'})
  }
  return reply.send({message: 'Article supprimé avec succés'})
} catch (err){
  console.error('Erreur lors de la suppression', err);
  return reply.send({error: 'Erreur'});
}
})

fastify.patch('/:id', async (request, reply) => {
const { id } = request.params
const dataToUpdate = request.body
console.log('Body reçu :', request.body)

try {
  const updated = await db('articles').where({ id }).update(dataToUpdate)
if (updated === 0){
  return reply.send({error: 'Article non trouvé'})
}

return reply.send({message: 'Article mis à jour avec succès'})
} catch (err){
  console.error('Erreur lors de la mise à jour', err);
  return reply.send({error: 'Erreur'});
}
})

};


export default routes;
