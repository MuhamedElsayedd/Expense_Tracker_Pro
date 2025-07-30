const errorHandler = (err, req, res, next) => {
    console.error(err);
  if(error){
    if(error.message){
      res.status(400).json({
        success: "failed",
        message: e.message,
      });

    }
    else{
      res.status(400).json({
        success: "failed",
        message: e,
      });

    }

  }
  else{
    next();

  }
};
  module.exports = errorHandler;