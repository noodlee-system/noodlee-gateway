const routesHooks = {
    onResponse(req, reply, res) { reply.send(res) }
};

const routesConfig = [
    {   // Users Microservice
        prefix: "/users",
        prefixRewrite: "/users",
        target: "http://users-service:8080",
        middlewares: [],
        hooks: routesHooks
    },
    {   // Courses Microservice
        prefix: "/courses",
        prefixRewrite: "/",
        target: "http://courses-service:8080",
        middlewares: [],
        hooks: routesHooks
    },
    {   // Authentication Microservice
        prefix: "/authentication",
        prefixRewrite: "/",
        target: "http://authentication-service:8080",
        middlewares: [],
        hooks: routesHooks
    }
];

module.exports = routesConfig;
