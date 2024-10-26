import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class CommitmentExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseMessage = 'Internal Server Error';

    if (exception instanceof BadRequestException) {
      const errorResponse = exception.getResponse();
      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
      return;
    }

    if (exception.message.includes('Strategy not found')) {
      statusCode = HttpStatus.BAD_REQUEST;
      responseMessage = exception.message;
    }

    response.status(statusCode).json({
      statusCode,
      message: responseMessage,
    });
  }
}
