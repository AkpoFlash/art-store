const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (res.headersSent) return next(err);
    res.status(500).json({error: 'Internal error'});
};

const notFoundHandler = (req, res) => {
  res.status(404).json({error: 'Not Found'});
};

module.exports = {
    errorHandler,
    notFoundHandler
};