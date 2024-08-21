const express = require("express");
const app = express();
require("dotenv")

const PORT = 3000;

require("dotenv").config();

const client = require("./db/client");

client.connect();


app.use(express.json());
//we're registering the routes in /api/index

app.use("/api", require("./api"));

app.get("/", (req,res) => {
    res.send("Hello from our Server");
})

app.listen(PORT, () => {
    console.log(`Server alive on port ${PORT}`);
});