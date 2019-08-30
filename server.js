const fastify = require('fastify')({});

const gatewayPort = 8080;
const routesConfig = require('./routes.config');

// Required plugin for HTTP requests proxy
fastify.register(require('fastify-reply-from'))

// Gateway plugin
fastify.register(require('k-fastify-gateway'), {
    middlewares: [require('cors')()],
    routes: routesConfig
});

console.log('Registered routes:', routesConfig.map(route => route.prefix));

// start the gateway HTTP server
fastify.listen(gatewayPort, '0.0.0.0', (err, address) => {
    if (err) {
        fastify.log.error(err);
    }

    console.log(`API Gateway listening on ${address}`)
});
