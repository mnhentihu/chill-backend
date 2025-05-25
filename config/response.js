const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    message,
    payload: data,
    metadata: {
      prev: "",
      next: "",
      current: "",
      timestamp: new Date().toISOString(),
    },
  });
};

module.exports = response;
