import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (isCelebrateError(err)) {
    const messages = [];

    err.details.forEach(detail => messages.push(detail.message));

    return response.status(400).json({
      status: 'Validation error',
      message: messages,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  });
}

export default errorHandler;
