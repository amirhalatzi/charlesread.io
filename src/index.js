'use strict'

require('require-self-ref')

const app = require('~/lib/app.js')
const log = require('~/lib/logger.js')()

app.start()
  .then(function (fastify) {
    log.info('server listening on port %s', fastify.server.address().port)
  })
  .catch(function (err) {
    console.error(err.stack)
  })