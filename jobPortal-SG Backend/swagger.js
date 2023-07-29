const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Adminn API's", // Title of your API
      version: "1.0.0", // Version of your API
      description: "Login and Register",
    },
    servers: [
      {
        url: "http://localhost:8081", // URL of your server
      },
    ],
  },
  apis: ["./route/admin.route.js"], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;
