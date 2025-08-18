import db from '../db.js';

const requireAuth = async (request, reply) => {
  if (!request.session.user) {
    reply.code(401)
    throw new Error('Authentification requise')
  }
}


async function routes (fastify) {
  fastify.get('/', async() => {
   try {
    const articles = await db('articles').orderByRaw('COALESCE(updated_at, created_at) DESC'); 
    return articles;
   } catch (err) {
    console.error('Erreur GET /articles', err);
    reply.status(500).send({ error: err.message });
   }
  });

fastify.get('/highlights', async (request, reply) => {
  try {
    const articles = await db('articles').limit(3).orderByRaw('COALESCE (updated_at, created_at) DESC');
    return articles;
   } catch (err) {
    console.error('Error GET /articles', err);
   }
  });

 

fastify.get('/:id', async (request) => {
  const { id } = request.params;
  try {
    const article = await db('articles').where({ id }).first();
    if (!article) {
      console.error('Article not found');
    } else {
      return article;
    }
  } catch (err) {
    console.error('Erreur GET /:id', err);
  }
});

fastify.get('/userarticles', async (request, reply) => {
  if (!request.session.user) {
    reply.code(401)
    return { error: 'Need to login' }
  }

  try {
    const articles = await db('articles')
    .where({ created_by: request.session.user.id })
      .orderByRaw('COALESCE(updated_at, created_at) DESC')

    return articles
  } catch (err) {
    console.error('Erreur GET /userarticles:', err)
    reply.code(500).send({ error: 'Error' })
  }
})


fastify.post('/', {
  preHandler: requireAuth  
}, async (request, reply) => {
  try {
    const { title, status, image, content, category} = request.body;
    const userId = request.session.user.id;

 
    
    if (!title || !status || !image || !content || !category  ){
      return reply.send({ error: 'Tous les champs sont requis'});
    }
    if (
      typeof title !== 'string' ||
      typeof status !== 'string' ||
      typeof image !== 'string' ||
      typeof content !== 'string' ||
      typeof category !== 'string' 
    ) {
      return reply.send({ error: 'Les champs doivent être des chaînes de caractères' });
    }


    const [id] = await db('articles')
    .insert({ title, status, image, content, category, created_by: userId,    
      updated_by: userId,})
    .returning('id')
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
} 
catch (err) {
  console.error('Erreur while deleting', err);
  return reply.send({error: 'Error'});
}
})

fastify.patch('/:id', async (request, reply) => {
const { id } = request.params
const dataToUpdate = request.body

try {
  const updated = await db('articles').where({ id }).update(dataToUpdate)
if (updated === 0){
  return reply.send({error: 'Article non trouvé'})
}

return reply.send({message: 'Article mis à jour avec succès'})
} 
catch (err){
  console.error('Erreur lors de la mise à jour', err);
  return reply.send({error: 'Error'});
}
})
};


export default routes;
