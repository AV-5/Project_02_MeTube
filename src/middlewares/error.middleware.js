import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || (error instanceof mongoose.Error ? 400 : 500);

    const message = error.message || "Something went wrong";

    error = new ApiError(
      statusCode,
      message,
      error?.errors || [],
      error.stack
    );
  }

  return res.status(error.statusCode).json({
    statusCode: error.statusCode,
    success: false,
    errors: error.errors,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

export { errorHandler };
