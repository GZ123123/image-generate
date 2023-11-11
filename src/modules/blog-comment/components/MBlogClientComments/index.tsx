import { MBlogCommentForm } from './Form';
import { MBlogCommentList } from './List';
import { IMBlogCommentProps } from './type';

export const MBlogComment = ({ blogId, className }: IMBlogCommentProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="font-bold text-xl">Leave a Comment</h3>
      <MBlogCommentList blogId={blogId} showEditor />
    </div>
  );
};