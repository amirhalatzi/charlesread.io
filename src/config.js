'use strict'

const config = {}

config.logger = {
  pretty: true,
  level: 'trace'
}

config.fjwt = {
  urlLogin: 'https://charlesread.auth0.com/authorize',
  urlAuthorizationCode: 'https://charlesread.auth0.com/oauth/token',
  urlJWKS: 'https://charlesread.auth0.com/.well-known/jwks.json',
  client_id: process.env['K_CLIENT_ID'] || '4AeNbrPdvGezPTpfXLdOrNkrC5Ln00RG',
  client_secret: process.env['K_CLIENT_SECRET'] || '2F8uII20W5bIRzZzw0HmczdcK_qMsyBWGs2MbOuxlVRTXDACuomlrY2AREV3AnNP',
  redirect_uri: process.env['K_REDIRECT_URI'] || 'http://localhost:3000/callback',
  cookie: {
    domain: process.env['K_DOMAIN'] || 'localhost',
    secure: process.env['K_PROD'] === 'false' ? false : true
  },
  pathExempt: [
    '/login',
    '/callback',
    '/'
  ]
}

module.exports = config