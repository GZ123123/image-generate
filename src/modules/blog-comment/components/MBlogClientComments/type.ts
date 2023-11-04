export interface IMBlogCommentProps {
  blogId: string;
  className?: string;
}

export interface IMBlogCommentListProps extends Pick<IMBlogCommentProps, 'blogId'> {
  parentId?: string;
  disableReply?: boolean;
  showEditor?: boolean;
  className?: string;
}

export interface IMBlogCommentItemProps {}

export interface IMBlogCommentFormProps extends Pick<IMBlogCommentProps, 'blogId'> {
  parentId?: string;
  onCreated?: () => void;
}
