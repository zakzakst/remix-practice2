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
        // TODO: エラー投げる
      }
      const data = await response.json();
      return data;
    } catch {
      // TODO: エラー投げる
    }
  }
}
