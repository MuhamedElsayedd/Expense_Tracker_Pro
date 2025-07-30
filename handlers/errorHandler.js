const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err) {
    if (err.message) {
      res.status(400).json({
        success: "failed",
        message: err.message,
      });
    } else {
      res.status(400).json({
        success: "failed",
        message: err,
      });
    }
  } else {
    next();
  }
};

module.exports = errorHandler;
