export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {
    super(message);
  }

  static badRequest(message: string) {
    console.log(message);
    return new CustomError("message", 400);
  }

  static notFound(message: string) {
    console.log(message);
    return new CustomError("notFound", 404);
  }

  static internal(message: string) {
    console.log(message);
    return new CustomError("Internal error", 500);
  }

  static unauthorized(message: string) {
    console.log(message);
    return new CustomError("unauthorized", 401);
  }

  static forbidden(message: string) {
    console.log(message);
    return new CustomError("forbidden ", 403);
  }

  static conflict(message: string) {
    console.log(message);
    return new CustomError("Conflict ", 409);
  }
}
