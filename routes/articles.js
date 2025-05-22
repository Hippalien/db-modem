import articles from '../data/articles.js';

async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    request.log.info('GET /')
    console.log('GET /')
    return articles
    })

fastify.get('/highlights', async (request, reply) => {
  const highlightArticles = articles.slice(0, 3);
  console.log('Highlight articles:', highlightArticles); 
  return highlightArticles;
  });

fastify.get('/:id', async (request, reply) => {
  console.log('je suis request',request)
  request.log.info('GET /:id')

  const articleId = request.params.id;
  const article = articles.find(function(article) {
  return article.id === articleId 
})

  if (!article)  {
    reply.code(404).send({error: 'Article not found'})
  }   
return article
});

}

export default routes;
