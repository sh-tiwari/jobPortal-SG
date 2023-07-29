const express = require("express");
const bodyParser = require("body-parser");
const route = require("./route");
const app = express();
const config= require('./config.json');
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");
const cors= require("cors");


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//cors implement
app.use(cors());

// Routes
app.use(config.apiPrefix, route);

// Route for serving the Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Route for serving the Swagger JSON specification
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(specs);
});

const port = process.env.PORT || config.port;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));


