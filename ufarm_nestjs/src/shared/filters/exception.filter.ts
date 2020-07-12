/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { constants } from '../../constants';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * Function to return Exception json response
     * @param type
     * @param message
     */
    const responseMessage = (exception: any) => {
      const { name, message, response: additionalDetails } = exception;
      response.status(status).json({
        statusCode: status,
        path: request.url,
        timestamp: new Date().toISOString(),
        errorType:
          exception.message && exception.message.error
            ? constants.mongoose_error
            : name,
        errorMessage: message,
        additionalDetails,
      });
    };
    if (exception.message.error) {
      responseMessage(exception);
    } else {
      responseMessage(exception);
    }
  }
}
