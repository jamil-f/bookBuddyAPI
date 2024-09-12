function requireUser(req,res,next){
    if(!res.user){
        res.status(401);
        next({
            name:"MissingUserError", 
            message:"You must be logged in to perform this action",
        });
    }

    next();
}

module.exports = { requireUser };