const express = require("express");
const server = express();
const app = express();
require("dotenv").config();
const PORT = process.env.DB_PORT || 3000;

const client = require("./db/client");

client.connect();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

console.log(process.env.JWT_SECRET);

app.use(express.json());
//we're registering the routes in /api/index


app.use("/api", require("./api"));

app.get("/", (req,res) => {
    res.send("Hello from our Server");
})

app.get("*", (req, res) => {
    res
    .status(404)
    .send({
        error: "404 - Not Found",
        message: "No route found for the requested URL",
    });
});

app.use((error, req, res, next) => {
    console.log("ERROR ", error);
    if(res.statusCode < 400) res.status(500);
    res.send({
        message: error.message,
        name: error.name,
    })
})

app.listen(PORT, () => {
    console.log(`Server alive on port ${PORT}`);
});