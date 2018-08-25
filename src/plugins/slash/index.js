'use strict'

const address = require('ip').address()

module.exports = function (fastify, opts, next) {
  fastify.get('/', (req, reply) => {
    const payload = {
      message: 'welcome to charlesread.io',
      itis: new Date(),
      iam: address,
      repo: 'https://github.com/charlesread/charlesread.io',
      image: 'https://hub.docker.com/r/charlesread/charlesread.io'
    }
    if (req.credentials) {
      payload.hey = req.credentials.sub
    } else {
      payload.login = 'https://www.charlesread.io/login'
    }
    reply.send(payload)
  })
  next()
}