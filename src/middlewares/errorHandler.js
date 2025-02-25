// src/middlewares/errorHandler.js
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }

  if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 400,
      message: 'Validation Error',
      data: {
        message: 'Validation Error',
        errors: Object.values(err.errors).map(e => e.message),
      },
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    data: err.message,
  });
};