import { HttpStatus } from "@nestjs/common";

export class APIResponse<Object>{
    statusCode: HttpStatus;
    message: string;
    data: Object;

    constructor(statusCode: HttpStatus, message: string, data: Object){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}