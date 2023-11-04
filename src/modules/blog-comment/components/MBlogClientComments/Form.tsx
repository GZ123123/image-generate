import { Controller, useForm } from 'react-hook-form';
import { IMBlogCommentFormProps,  } from './type';
import { blogCommentResolver } from './validate';
import { useEffect, useRef } from 'react';
import { ISavedCommentAuthor } from '../../type';
import { ICreateBlogCommentParams } from 'src/apis/blog-comment/types';
import { blogCommentAPI } from 'src/apis';

const SAVED_COMMENT_AUTHOR_KEY = '_comment_author';

const DEFAULT_COMMENT_AUTHOR: ISavedCommentAuthor = {
  fullname: '',
  email: '',
  profile_url: '',
  remember: false, 
};

const getSavedCommentAuthor = (): ISavedCommentAuthor => {
  if (typeof window !== 'undefined') {
    try { 
      const saved = window.localStorage.getItem(SAVED_COMMENT_AUTHOR_KEY);
  
      if (!saved) {
        return DEFAULT_COMMENT_AUTHOR;
      }
  
      const savedAuthor: Partial<ISavedCommentAuthor> = JSON.parse(saved);
  
      return {
        fullname: savedAuthor.fullname ?? '',
        email: savedAuthor.email ?? '',
        profile_url: savedAuthor.profile_url ?? '',
        remember: savedAuthor.remember ?? false,
      };
    } catch (error) {
      return DEFAULT_COMMENT_AUTHOR;
    }
  }

  return DEFAULT_COMMENT_AUTHOR;
};

export const MBlogCommentForm = ({ blogId, parentId, onCreated }: IMBlogCommentFormProps) => {
  const rememberInputRef = useRef<HTMLInputElement | null>(null);

  const { control, handleSubmit, reset } = useForm<ICreateBlogCommentParams>({
    defaultValues: {
      fullname: '',
      email: '',
      profile_url: '',
      content: '',
      blog_id: blogId,
      parent_id: parentId,
    },
    resolver: blogCommentResolver,
  });

  const onSubmit = async (value: ICreateBlogCommentParams) => {
    if (rememberInputRef.current?.checked) {
      window.localStorage.setItem(SAVED_COMMENT_AUTHOR_KEY, JSON.stringify({
        fullname: value.fullname,
        email: value.email,
        profile_url: value.profile_url,
        remember: true, 
      } as ISavedCommentAuthor))
    } else {
      window.localStorage.removeItem(SAVED_COMMENT_AUTHOR_KEY);
    }

    await blogCommentAPI.create(value);

    onCreated && onCreated();
  };

  useEffect(() => {
    const savedAuthor = getSavedCommentAuthor();

    if (rememberInputRef.current) {
      rememberInputRef.current.checked = savedAuthor.remember;
    }

    reset( {
      content: '',
      fullname: savedAuthor.fullname,
      email: savedAuthor.email,
      profile_url: savedAuthor.profile_url,
      blog_id: blogId,
      parent_id: parentId,
    });
  }, []);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller 
        control={control}
        name="content"
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-1.5">
            <textarea 
              {...field} 
              className="block w-full bg-white dark:bg-[#131624] rounded border-gray-300 dark:border-gray-600" 
              rows={5} 
            />
            {error?.message && <p className="block text-sm text-red-500">{error.message}</p>}
          </div>
        )}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="space-y-2.5">
          <Controller 
            control={control}
            name="fullname"
            render={({ field, fieldState: { error } }) => (
              <div className="space-y-1.5">
                <input 
                  {...field} 
                  type="text" 
                  className="w-full bg-white dark:bg-[#131624] rounded border-gray-300 dark:border-gray-600" 
                  placeholder="Name *"
                />
                {error?.message && <p className="block text-sm text-red-500">{error.message}</p>}
              </div>
            )}
          />
          <Controller 
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <div className="space-y-1.5">
                <input 
                  {...field} 
                  type="email" 
                  className="w-full bg-white dark:bg-[#131624] rounded border-gray-300 dark:border-gray-600" 
                  placeholder="Email *"
                />
                {error?.message && <p className="block text-sm text-red-500">{error.message}</p>}
              </div>
            )}
          />
          <Controller 
            control={control}
            name="profile_url"
            render={({ field, fieldState: { error } }) => (
              <div className="space-y-1.5">
                <input 
                  {...field} 
                  type="url" 
                  className="w-full bg-white dark:bg-[#131624] rounded border-gray-300 dark:border-gray-600" 
                  placeholder="Website"
                />
                {error?.message && <p className="block text-sm text-red-500">{error.message}</p>}
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input ref={rememberInputRef} id="remember" type="checkbox" className="rounded h-[22px] w-[22px] border-gray-300 dark:border-gray-600 focus:outline-none" />
        <label htmlFor="remember">Save my name, email, and website in this browser for the next time I comment.</label>
      </div>
      <div>
        <button 
          type="submit" 
          className="appearance-none py-2.5 px-4 bg-gray-500 dark:bg-gray-100 rounded text-gray-50 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};