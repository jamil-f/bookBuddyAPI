const express = require("express");

const bookRouter = express.Router();
apiRouter.use("books", require("./books"));

bookRouter.get("/", (req, res) => {
    res.send("here are all the books");
});

module.exports = bookRouter;