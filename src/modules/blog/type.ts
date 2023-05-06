import { IBlogRequest, IPublicBlogsResponse } from "src/apis/blog/types";
import { IHashtagResponse } from "src/apis/hashtag/types";

export interface IBlogPageProps {
  blogs: IPublicBlogsResponse[];
}

export interface IMBlogUpdatePageProps {
  id: string;

  blog: IBlogRequest;

  initialTags: IHashtagResponse[];
}
