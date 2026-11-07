import { ExternalErrorCodes } from "../exceptions/ExternalError.ts";

interface ExternalApiProps {
  basePath: string;
}

const REQUEST_TIMEOUT_MS = 5_000;

export class ExternalApi {
  private basePath: string;

  constructor(props: ExternalApiProps) {
    this.basePath = props.basePath;
  }

  async get() {
    const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(this.basePath, { signal: timeoutSignal });
      if (!response.ok) {
        throw ExternalErrorCodes.EX502001(undefined, response);
      }
      const data = await response.json();
      return data;
    } catch {
      throw ExternalErrorCodes.EX500001();
    }
  }
}
