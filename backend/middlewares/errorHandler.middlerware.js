export const errorHandler = (err, req, res, next) => {
  
  // console.error("Error Status Code:", err.statusCode);
  // console.error("Error Message:", err.message);
  // console.error("Error Details:", err.errors);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
};
