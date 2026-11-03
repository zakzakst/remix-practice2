import { ErrorCodes } from "../../exceptions/ErrorCodes.ts";
import type { IJPPostsResponse } from "../../interfaces/json-placeholder/IPosts.ts";

export class JPPostsRepository {
  private baseUrl: string;

  constructor() {
    // TODO: 環境変数に移動
    this.baseUrl = "https://jsonplaceholder.typicode.com/posts";
  }

  async getAll(): Promise<IJPPostsResponse | undefined> {
    // TODO: consoleではなく、きちんとしたロギング実装
    console.log("Start: json placeholder posts get");

    try {
      const res = await fetch(this.baseUrl);
      const data = (await res.json()) as IJPPostsResponse;
      return data;
    } catch (e) {
      // TODO: 例外処理実装
      ErrorCodes.SYS5030001();
    }
  }
}
