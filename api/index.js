const express = require("express");

const apiRouter = express.Router();
// register routes for request that have for {baseURL}/api/users/register
apiRouter.use("/users", require("./user"));


// baseurl/api
apiRouter.get("/", (req, res) => {
    res.send("Hello from /api");
});

module.exports = apiRouter;