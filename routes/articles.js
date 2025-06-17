import db from '../db.js';

async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
   try {
    const articles = await db('articles');
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
})
};


export default routes;
