const fastify = require('fastify')({});
const fs = require('fs');

const gatewayPort = 8080;
let routesArray = [];

try {
    const routesFile = fs.readFileSync('./routes.json', 'utf-8');

    routesArray = JSON.parse(routesFile);
} catch (error) {
    console.error('Configuration file read error!');
    process.exit(1);
}

// Required plugin for HTTP requests proxy
fastify.register(require('fastify-reply-from'))

// Gateway plugin
fastify.register(require('k-fastify-gateway'), {
    middlewares: [require('cors')()],
    routes: routesArray.map((item) => {
        return {
            prefix: item.prefix,
            prefixRewrite: item.prefix,
            target: item.target,
            middlewares: [],
            hooks: {
                onResponse(req, reply, res) { reply.send(res) }
            }
        }
    })
});

console.log('Registered routes:', routesArray.map(route => route.prefix));

// start the gateway HTTP server
fastify.listen(gatewayPort, '0.0.0.0', (err, address) => {
    if (err) {
        fastify.log.error(err);
    }

    console.log(`API Gateway listening on ${address}`)
});
