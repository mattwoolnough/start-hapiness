'use strict';

// load deps
const Joi = require('joi');

const ArticleValidator = {
  list,
  read,
  create,
  update,
  destroy
};

module.exports = ArticleValidator;

function list () {
  return {};
}

function read () {
  return {
    params: {
      id: Joi
        .string()
        .alphanum()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
        .required()
    }
  };
}

function create () {
  return {
    payload: {
      title: Joi
        .string()
        .min(1)
        .max(30)
        .trim()
        .required(),
      body: Joi
        .string()
        .min(1)
        .max(1000)
        .trim()
        .required(),
    }
  };
}

function update () {
  return {
    params: {
      id: Joi
        .string()
        .alphanum()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
        .required()
    },
   payload: {
      title: Joi
        .string()
        .min(1)
        .max(30)
        .trim()
        .required(),
      body: Joi
        .string()
        .min(1)
        .max(1000)
        .trim()
        .required(),
    }
  };
}

function destroy () {
  return {
    params: {
      id: Joi
        .string()
        .alphanum()
        .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id')
        .required()
    }
  };
}
