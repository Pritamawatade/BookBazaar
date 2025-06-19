export class ApiResponse {
  statusCode: number;
  message: string;
  data: any;
  success: boolean;

  constructor(
    statusCode: number,
    message: string = "executed successfully",
    data: any,
    success: boolean = true
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = success;
  }
}
