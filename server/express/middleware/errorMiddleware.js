const errorMiddleware = (err, req, res, next) => {
    // handle errors for all requests
    let status;
    if (err.status) {
      status = err.status;
    } else {
      status = 500
    }
    res.status(status).send(err);
  }

module.exports = errorMiddleware