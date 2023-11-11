import { ICreateBlogCommentParams } from 'src/apis/blog-comment/types';

export interface ISavedCommentAuthor 
  extends Pick<ICreateBlogCommentParams, 'fullname' | 'email' | 'profile_url'> {
  remember: boolean;
}
