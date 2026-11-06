import type { Post } from "../models/posts.ts";

export type GetAllPostsRequestParams = {
  page?: number;
  limit?: number;
};

export type GetAllPostsResponse = {
  page: number;
  limit: number;
  items: Post[];
};
