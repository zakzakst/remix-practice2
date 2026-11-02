import { ErrorCodes } from "../../exceptions/ErrorCodes.ts";

export class JPPostsRepository {
  private baseUrl: string;

  constructor() {
    // TODO: 環境変数に移動
    this.baseUrl = "https://jsonplaceholder.typicode.com/posts";
  }

  async get() {
    // TODO: consoleではなく、きちんとしたロギング実装
    console.log("Start: json placeholder posts get");

    try {
      const res = await fetch(this.baseUrl);
    } catch (e) {
      // TODO: 例外処理実装
      ErrorCodes.SYS5030001();
    }
  }
}
