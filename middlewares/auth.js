const auth = (req,res,next) => {
    console.log("Hello from Auth MiddleWare!");

    throw "Can't do this for now"
    // next();
}

module.exports =auth;