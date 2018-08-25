'use strict'

const address = require('ip').address()

module.exports = function (fastify, opts, next) {
  fastify.get('/', (req, reply) => {
    const payload = {
      message: 'welcome to charlesread.io',
      itis: new Date(),
      iam: address,
    }
    if (req.credentials) {
      payload.hey = req.credentials.sub
    } else {
      payload.login = 'https://charlesread.io/login'
    }
    reply.send(payload)
  })
  next()
}