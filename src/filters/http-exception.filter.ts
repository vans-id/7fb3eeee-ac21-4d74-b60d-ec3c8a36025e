import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from 'src/response/app-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const message = exception.getResponse() as
            | string
            | { message: string; error: string };

        response.status(status).json(new ErrorResponse(
            typeof message === 'string' ? message : message.message
        ));
    }
}