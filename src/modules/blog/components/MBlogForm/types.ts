import { IBlogRequest, IBlogResponse } from "src/apis/blog/types";
import { IHashtagResponse } from "src/apis/hashtag/types";
import { IAPIResponse } from "src/common/interfaces";

export interface IMBlogFormProps {
  onSubmit: (data: IBlogRequest) => Promise<IAPIResponse<IBlogResponse> | null>;
  onCancel: () => void;
  initialTags?: IHashtagResponse[];
  value?: IBlogRequest;
  edit?: boolean;
}
