const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/users");

apiRouter.use(async (req, res, next) => {
    const auth = req.header("Authorization");
    const prefix = "Bearer ";
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      console.log(auth);
      const token = auth.slice(prefix.length);
      try {
        console.log("checking");
        const parsedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = parsedToken && parsedToken.id;
  
        if (id) {
          req.user = await getUserById(id);
          console.log("the request user", req.user);
          next();
        }
      } catch (err) {
        next(err);
      }
    } else {
      next({
        name: "AuthorizationHeaderError",
        message: "Authorization token must start with 'Bearer '",
      });
    }
  });



// register routes for request that have for {baseURL}/api/users/register
apiRouter.use("/users", require("./user"));

apiRouter.use("/books", require("./books"));


apiRouter.use("/reservations", require("./reservations"));

// baseurl/api
apiRouter.get("/", (req, res) => {
    res.send("Hello from /api");
});

module.exports = apiRouter;