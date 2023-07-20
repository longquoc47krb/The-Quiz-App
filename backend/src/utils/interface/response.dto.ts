export class ResponseDto<T> {
    status: string;
    message: string;
    data?: T;

    private constructor(status: string, message: string, data?: T) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
    static createSuccess(message: string) {
        return new ResponseDto('success', message);
    }
    static createWithData<T>(message: string, data: T): ResponseDto<T> {
        return new ResponseDto<T>('success', message, data);
    }
}
