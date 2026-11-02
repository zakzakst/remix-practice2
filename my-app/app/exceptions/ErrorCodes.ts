import { AppError } from "./AppError.ts";

export class ErrorCodes {
  // 外部API連携エラー
  static SYS5030001(message?: string, details?: unknown): AppError {
    return new AppError({
      logLevel: "ERROR",
      statusCode: 503,
      code: "SYS5030001",
      message: message || "外部API連携に失敗しました",
      details,
    });
  }
}
