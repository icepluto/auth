import { expression } from "@babel/template";
import { exportAllDeclaration } from "@babel/types";
import { ArgumentsHost, Catch, ExceptionFilter, HttpCode, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { AppError } from "./AppError";

@Catch()
export class DispatchError implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse()
        if (exception instanceof AppError) {
            return res.status(exception.httpStatus).send({
                errorCode: exception.errorCode,
                errorMsg: exception.errorMessage,
                userMsg: exception.userMessage,
                httpCode: exception.httpStatus
            })
        } else if (exception instanceof UnauthorizedException) {
            return res.status(HttpStatus.UNAUTHORIZED).json(exception.message)
        } else if (exception.status === 403) {
            return res.status(HttpStatus.FORBIDDEN).json(exception.message);
        }
        else {
            console.error(exception.message);
            console.error(exception.stack);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }

    }

}