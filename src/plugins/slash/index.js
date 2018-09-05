'use strict'

const address = require('ip').address()
const jwt = require('jsonwebtoken')
const moment = require('moment-timezone')

module.exports = function (fastify, opts, next) {
  fastify.get('/', (req, reply) => {
    const payload = {
      message: 'welcome to charlesread.io',
      iam: address,
      repo: 'https://github.com/charlesread/charlesread.io',
      image: 'https://hub.docker.com/r/charlesread/charlesread.io'
    }
    if (req.credentials) {
      payload.hey = req.credentials.sub
    } else {
      payload.login = 'https://www.charlesread.io/login'
    }
    if (req.cookies.token) {
      const tokenDecoded = jwt.decode(req.cookies.token, {complete: true})
      payload.jwtIssued = moment.tz(tokenDecoded.payload.iat * 1000, 'America/New_York').format('LLLL z')
      payload.jwtExpiration = moment.tz(tokenDecoded.payload.exp * 1000, 'America/New_York').format('LLLL z')
    }
    reply.send(payload)
  })
  next()
}