'use strict';

function ArticleController (db) {
  this.database = db;
  this.model = db.Article;
}

ArticleController.prototype = {
  list,
  read,
  create,
  update,
  destroy
};

module.exports = ArticleController;

// [GET] /article
function list (request, reply) {
  const userId = request.auth.credentials.id;

  this.model.findAsync({owner: userId})
  .then((articles) => {
    reply(articles);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [GET] /article/{id}
function read (request, reply) {
  const userId = request.auth.credentials.id;
  const id = request.params.id;

  this.model.findOneAsync({_id: id, owner: userId})
  .then((article) => {
    if (!article) {
      reply.notFound();
      return;
    }

    reply(article);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [POST] /article
function create (request, reply) {
  const userId = request.auth.credentials.id;
  const payload = request.payload;

  payload.owner = userId;

  this.model.createAsync(payload)
  .then((article) => {
    reply(article).code(201);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [PUT] /article/{id}
function update (request, reply) {
  const userId = request.auth.credentials.id;
  const id = request.params.id;
  const payload = request.payload;

  this.model.findOneAndUpdateAsync({_id: id, owner: userId}, payload, { new: true })
  .then((article) => {
    reply(article);
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}

// [DELETE] /article/{id}
function destroy (request, reply) {
  const userId = request.auth.credentials.id;
  const id = request.params.id;

  this.model.removeAsync({_id: id, owner: userId})
  .then(() => {
    reply();
  })
  .catch((err) => {
    reply.badImplementation(err.message);
  });
}
