class ApiError extends Error {
  statusCode: number;
  message: string;
  error: any;
  success: boolean;

  constructor(
    statusCode: number,
    message: string = "something went wrong",
    error: any,
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.success = false;
    this.message = message;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}   

export { ApiError };