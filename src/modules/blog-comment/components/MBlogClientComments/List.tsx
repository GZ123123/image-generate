import { Fragment, useMemo, useState } from 'react';
import { IMBlogCommentListProps } from './type';
import { IPublicBlogCommentParams, IPublicBlogCommentsResponse } from 'src/apis/blog-comment/types';
import { blogCommentAPIClient } from 'src/apis/blog-comment/client';
import useSWRInfinite from 'swr/infinite';
import { MBlogCommentForm } from './Form';

const DEFAULT_COMMENT_PER_PAGE: number = 10;

const MBlogCommentChildList = (
  { blogId, disableReply, comment }: 
    Pick<IMBlogCommentListProps, 'blogId' | 'disableReply' | 'showEditor'> 
      & { comment: IPublicBlogCommentsResponse },
) => {
  const [showComment, setShowComment] = useState<boolean>(false);
  const [showEditor, setShowEditor] = useState<boolean>(false);

  const displayComments = () => {
    setShowComment(true);
  }

  const displayEditor = () => {
    setShowEditor(true);
    displayComments();
  }

  return (
    <>
      {!disableReply && (
        <div className="mt-1.5">
          <button 
            type="button" 
            className="inline-flex items-center text-gray-700 dark:text-gray-400 hover:underline" 
            onClick={displayEditor}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1"></path>
            </svg>
            Reply
          </button>
        </div>
      )}
      {!showComment && comment.child_comments > 0 && (
        <div className="mt-1.5">
          <button 
            type="button" 
            className="text-blue-500 hover:underline"
            onClick={displayComments}
          >
            Show {comment.child_comments} replies
          </button>
        </div>
      )}
      {showComment && (
        <MBlogCommentList 
          blogId={blogId} 
          parentId={comment._id} 
          className="ml-0.5 pl-5 mt-4 border-l-2 border-gray-300 dark:border-gray-600" 
          disableReply 
          showEditor={showEditor}
        />
      )}
    </>
  )
}

export const MBlogCommentList = ({ blogId, showEditor, disableReply, parentId, className }: IMBlogCommentListProps) => {
  const { data, size, setSize, isLoading, mutate } = useSWRInfinite(
    (pageIndex, previousPageData): IPublicBlogCommentParams | null => {
      if (previousPageData && !previousPageData?.data?.items) {
        return null;
      }

      return {
        size: DEFAULT_COMMENT_PER_PAGE,
        parent_id: parentId,
        comment_id: previousPageData?.data?.next_cursor ?? undefined,
      }
    },
    (params) => blogCommentAPIClient.get(blogId, params),
    {
      errorRetryCount: 0,
      revalidateOnFocus: false,
      initialSize: 1,
    }
  );

  const isLoadingMore = useMemo(() => {
    return isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  }, [isLoading, size, data]);

  const isEmpty = useMemo(() => data?.[0]?.data.items.length === 0, [data]);

  const hasNextPage = useMemo<boolean>(() => {
    return !!data?.[data.length - 1].data.next_cursor
  }, [data]);

  const onRefresh = () => {
    mutate();
  }

  const fetchNextPage = () => {
    setSize((prev) => prev + 1);
  }

  return (
    <div className={className}>
      {showEditor && (
        <MBlogCommentForm blogId={blogId} parentId={parentId} onCreated={onRefresh} />
      )}
      {isLoading ? (
        <div className="py-6">
          <p>Loading comments...</p>
        </div>
      ) : !isEmpty && (
        <>
          <div className="divide-y divide-gray-300 dark:divide-gray-600">
            {data?.map((response, index) => (
              <Fragment key={index}>
                {response.data.items.map((comment) => (
                  <div key={comment._id} className="py-6 last:pb-0">
                    <p className="mb-1.5">
                      <span className="font-bold">{comment.fullname}</span>
                      {comment.created_date && (
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{comment.created_date}</span>
                      )}
                    </p>
                    <p className="whitespace-pre-line">{comment.content}</p>
                    <MBlogCommentChildList blogId={blogId} comment={comment} disableReply={disableReply} />
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
          {hasNextPage && (
            <div className="text-center">
              <button 
                type="button" 
                className="appearance-none py-1.5 px-3 bg-gray-500 dark:bg-gray-100 rounded text-gray-50 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                onClick={fetchNextPage}
                disabled={isLoading || isLoadingMore}
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};