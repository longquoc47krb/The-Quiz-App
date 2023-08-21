export class ResponseDto<T> {
    statusCode: number;
    message: string;
    data?: T;

    public constructor(statusCode: number, message: string, data?: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
    static createSuccess(message: string) {
        return new ResponseDto(200, message);
    }
    static createWithData<T>(message: string, data: T): ResponseDto<T> {
        return new ResponseDto<T>(200, message, data);
    }
}
