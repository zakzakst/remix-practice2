import type {
  GetAllPostsRequestParams,
  GetAllPostsResponse,
} from "../interfaces/IPosts.ts";

const GET_ALL_POSTS_DEFAULT_LIMIT: number = 20;

export class PostsUseCases {
  constructor() {}

  async getAll(params: GetAllPostsRequestParams): Promise<GetAllPostsResponse> {
    const page = params.page || 1;
    const limit = params.limit || GET_ALL_POSTS_DEFAULT_LIMIT;

    const response = {
      page,
      limit,
      items: [],
    };

    return response;
  }
}
