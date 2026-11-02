type LogLevel = "WARN" | "ERROR" | "INFO";

type AppErrorProps = {
  logLevel: LogLevel;
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
};

export class AppError {
  public logLevel: LogLevel;
  public statusCode: number;
  public code: string;
  public message: string;
  public details: unknown;

  constructor(props: AppErrorProps) {
    this.logLevel = props.logLevel;
    this.statusCode = props.statusCode;
    this.code = props.code;
    this.message = props.message;
    this.details = props.details;
  }
}
