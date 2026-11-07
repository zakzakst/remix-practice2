import { AppError } from "./AppError.ts";

export class ExternalErrorCodes {
  // 予期しないエラー
  static EX500001(message?: string, details?: unknown): AppError {
    return new AppError({
      logLevel: "ERROR",
      statusCode: 500,
      code: "EX500001",
      message: message || "外部API通信で予期しないエラーが発生しました",
      details,
    });
  }

  // 汎用エラー
  static EX502001(message?: string, details?: unknown): AppError {
    return new AppError({
      logLevel: "ERROR",
      statusCode: 502,
      code: "EX502001",
      message: message || "外部API通信で不正な応答を受け取りました",
      details,
    });
  }
}
