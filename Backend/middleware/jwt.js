const expressJwt = require('express-jwt');


function auth() {
  const secret = 'secret';
  return expressJwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: '/api/products', methods: ['GET', 'OPTIONS'] },
      '/api/users/login',
      '/api/users/register'
    ]
  })
}


async function isRevoked(req, payload, done) {
  if (!payload.admin) {
    done(null, true);
  }
  done();
}


module.exports = auth;
