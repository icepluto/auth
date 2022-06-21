import { HttpStatus } from "@nestjs/common";
import { AppErrorTypeEnum } from "../error/AppErrorTypeEnum";

export interface IErrorMessage{
    type:AppErrorTypeEnum,
    httpStatus:HttpStatus,
    errorMessage:string,
    userMessage:string,
}