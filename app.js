const http = require('http')
const https = require('https')
const Koa = require('koa');
const app = new Koa();
const movies = require('./movies.json');

/*
  MIDDLEWARE
*/

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  const { request } = ctx;
  if(request.url === '/') {
    ctx.body = 'Welcome to the Scratch Kitchen'
  } else if (request.url === '/movies') {
    ctx.body = movies;
  }
});

app.on('error', err => {
  log.error('server error', err)
});

http.createServer(app.callback()).listen(5000);
https.createServer(app.callback()).listen(5001);