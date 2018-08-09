'use strict'

const address = require('ip').address()

module.exports = function (fastify, opts, next) {
  fastify.get('/', (req, reply) => {
    reply.send({
      message: 'welcome to charlesread.io',
      date: new Date(),
      containerAddress: address
    })
  })
  next()
}