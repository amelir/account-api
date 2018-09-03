const allowMethods = require('allow-methods');
const express = require('express');
const { User } = require('schemas').models;

const route = express.Router();

route
  .route('/tokens')
  .all(allowMethods(['get']))
  .get((req, res, next) => {
    // Get tokens from database
    User.findOne({email: req.user.sub}, {tokens: 1})
      .then(data => {
        res.send(data.tokens);
      })
      .catch(next);
  });


module.exports = route;