const errorHandler = (err, req, res, next) => {
    console.error(err);
  
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


    if (res.headersSent) {
      return next(err);
    }
  
    res.status(400).json({
      success: false,
      message: 'Something went wrong!',
    });
  };
  
  module.exports = errorHandler;
  