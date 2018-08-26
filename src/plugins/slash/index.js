'use strict'

const address = require('ip').address()
const jwt = require('jsonwebtoken')

module.exports = function (fastify, opts, next) {
  fastify.get('/', (req, reply) => {
    const payload = {
      message: 'welcome to charlesread.io',
      itis: new Date(),
      iam: address,
      repo: 'https://github.com/charlesread/charlesread.io',
      image: 'https://hub.docker.com/r/charlesread/charlesread.io',
      cookies: req.cookies
    }
    if (req.cookies.token) {
      payload.tokenDecoded = jwt.decode(req.cookies.token, {complete: true})
    }
    if (req.credentials) {
      fastify.credentials.trace(req.credentials)
      payload.credentials = req.credentials
      payload.hey = req.credentials.sub
    } else {
      payload.login = 'https://www.charlesread.io/login'
    }
    reply.send(payload)
  })
  next()
}