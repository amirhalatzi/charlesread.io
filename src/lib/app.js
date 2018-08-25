'use strict'

const path = require('path')

const config = require('~/config.js')
const log = require('~/lib/logger.js')()
const fjwt = require('fastify-jwt-webapp')

const dir = require('node-dir')
const fastify = require('fastify')({
  logger: log,
  level: 'trace'
})

const app = {}

app.start = async function () {

// loop through all files in /plugins and fastify.register(require()) them
  const pluginPaths = await dir.promiseFiles(path.join(__dirname, '..', 'plugins'))
  for (let i = 0; i < pluginPaths.length; i++) {
    log.trace('registering plugin at %s', pluginPaths[i])
    await fastify.register(require(pluginPaths[i]))
  }
  log.trace('finished registering plugins')

  await fastify.register(fjwt, config.fjwt)

  await fastify.listen(3000, '0.0.0.0')
  log.trace('fastify is listening')

  process.on('SIGINT', function () {
    console.log('caught SIGINT')
    fastify.close(function () {
      console.log('close callback called')
      process.exit(0)
    })
  })

  return fastify

}

module.exports = app