const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  let message = err.message || "Something went wrong";

  if (status === 500) {
    console.error(err.stack); // Log internal errors only
    message = "Internal Server Error";
  }

  res.status(status).json({ message });
};

export default errorHandler;
