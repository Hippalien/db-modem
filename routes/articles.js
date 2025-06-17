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

}

export default routes;
