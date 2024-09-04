const errorMiddleware = (err, req, res, next) => {
    // handle errors for all requests
    console.log('error middleware initiated')
    let status;
    if (err.status) {
      status = err.status;
    } else {
      status = 500
    }
    res.status(status).send(err.message || err);
  }

module.exports = errorMiddleware