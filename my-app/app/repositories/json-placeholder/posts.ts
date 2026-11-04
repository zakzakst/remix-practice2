import { ErrorCodes } from "../../exceptions/ErrorCodes.ts";
import type { IJPPostsResponse } from "../../interfaces/json-placeholder/IPosts.ts";
import type { JPPost } from "../../models/json-placeholder/posts.ts";

const DEFAULT_POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const REQUEST_TIMEOUT_MS = 5_000;

function isPostsResponse(data: unknown): data is IJPPostsResponse {
  return (
    Array.isArray(data) &&
    data.every(
      (post): post is JPPost =>
        typeof post === "object" &&
        post !== null &&
        "userId" in post &&
        typeof post.userId === "number" &&
        Number.isFinite(post.userId) &&
        "id" in post &&
        typeof post.id === "number" &&
        Number.isFinite(post.id) &&
        "title" in post &&
        typeof post.title === "string" &&
        "body" in post &&
        typeof post.body === "string",
    )
  );
}

export class JPPostsRepository {
  private readonly baseUrl: string;

  constructor() {
    const configuredUrl =
      process.env.JSON_PLACEHOLDER_POSTS_URL ?? DEFAULT_POSTS_URL;
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(configuredUrl);
    } catch (error) {
      throw new Error(
        "JSON_PLACEHOLDER_POSTS_URL must be a valid absolute HTTPS URL",
        { cause: error },
      );
    }

    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.username !== "" ||
      parsedUrl.password !== "" ||
      parsedUrl.hash !== ""
    ) {
      throw new Error(
        "JSON_PLACEHOLDER_POSTS_URL must be a valid absolute HTTPS URL without credentials or a fragment",
      );
    }

    this.baseUrl = parsedUrl.href;
  }

  async getAll(): Promise<IJPPostsResponse> {
    const startedAt = Date.now();
    const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
    let failureCategory = "request_error";
    let upstreamStatus: number | undefined;
    try {
      // TODO: requestに設定してみる
      // - Content-Type
      // - custom-retry-times
      // - ベーシック認証
      // - maxContentLength
      // TODO: axiosでinterceptors使ってみる
      const response = await fetch(this.baseUrl, { signal: timeoutSignal });
      if (!response.ok) {
        failureCategory = "http_error";
        upstreamStatus = response.status;
        throw new Error("Upstream API returned a non-success status");
      }

      failureCategory = "invalid_json";
      const data: unknown = await response.json();

      failureCategory = "invalid_response";
      if (!isPostsResponse(data)) {
        throw new Error("Upstream API returned an unexpected response shape");
      }

      return data;
    } catch {
      console.error({
        event: "external_api_request_failed",
        service: "json-placeholder",
        category: timeoutSignal.aborted ? "timeout" : failureCategory,
        status: upstreamStatus,
        durationMs: Date.now() - startedAt,
      });
      throw ErrorCodes.SYS5030001();
    }
  }
}
