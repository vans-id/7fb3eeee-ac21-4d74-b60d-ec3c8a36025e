export class AppResponseInterface<T> {
    data?: T
    message?: string
}
  
export class SuccessResponse<T> implements AppResponseInterface<T> {
    constructor(
        public data?: T,
    ) {}
}

export class ErrorResponse<T> implements AppResponseInterface<T> {
    constructor(
        public message?: string
    ) {}
}