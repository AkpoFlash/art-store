const express = require("express");
const bodyParser = require("body-parser");

const cors = require("./middlewares/cors");
const error = require("./middlewares/error");
const api = require("./api/printshop");

const port = process.env.PORT || 1234;

const app = express();

app.use(cors.setCORSRules);
app.use(bodyParser.json());

app.get("/products", api.listProducts);
app.get("/products/:id", api.getProduct);
app.post("/products", api.createProduct);
app.put("/products/:id", api.updateProduct);
app.delete("/products/:id", api.deleteProduct);

app.get("/orders", api.listOrder);
app.post("/orders", api.createOrder);

app.use(error.errorHandler);
app.use(error.notFoundHandler);

app.listen(port, () => console.log(`Server listening on port ${port}`));
