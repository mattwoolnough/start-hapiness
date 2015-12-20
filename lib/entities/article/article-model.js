'use strict';

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  checked: Boolean
}, { timestamps: true }); //http://stackoverflow.com/questions/12669615/add-created-at-and-updated-at-fields-to-mongoose-schemas#

const ArticleModel = mongoose.model('Article', Schema);

module.exports = ArticleModel;

