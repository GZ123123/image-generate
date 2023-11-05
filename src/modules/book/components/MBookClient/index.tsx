import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { bookAPIClient } from 'src/apis/book/client';
import { classNames } from 'src/utils/class-names';
import useSWR from 'swr';

export const MBookClient = () => {
  const [message, setMessage] = useState<{ type: 'success' | 'error', value: string } | null>(null);

  const { data } = useSWR(['book_avaiable'], () => bookAPIClient.get());

  const { register, handleSubmit } = useForm<{ email: string }>({
    defaultValues: {
      email: '',
    },
  })

  const book = useMemo(() => data?.data, [data]);

  const onSendBook = handleSubmit(async ({ email }) => {
    if (!book?._id) {
      return;
    }

    try {
      await bookAPIClient.send(book?._id, email);
      setMessage({
        type: 'success',
        value: 'Success! Check your email to download the book!',
      });
    } catch (error) {
      setMessage({
        type: 'error',
        value: 'Something error!',
      });
    }
  });

  if (!book) {
    return null;
  }

  return (
    <div className="border border-gray-600 rounded-lg p-4 sm:p-6">
      <div className="flex md:flex-row flex-col gap-4 sm:gap-6">
        {book.image_url && (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={book.image_url} 
              alt={book.name} 
              className="w-40 lg:w-52 max-w-full mx-auto h-auto"
            />
          </div>
        )}
        <div className="flex-1 space-y-4">
          <p className="font-bold text-2xl sm:text-3xl">{book.name}</p>
          <div className="prose prose-li:my-1 prose-pre:my-2 prose-img:my-2 text-base leading-normal max-w-none dark:prose-dark">
            <div
              className="ck-content client !min-h-0"
              dangerouslySetInnerHTML={{ __html: book.description }}
            />
          </div>
          {message ? (
            <div 
              className={
                classNames(
                  'p-4 border rounded', 
                  message.type === 'error' 
                    ? 'bg-red-50 text-red-700 border border-red-200' 
                    : 'bg-green-50 text-green-700 border border-green-200',
                )
              }
            >
              <p>{message.value}</p>
            </div>
          ) : (
            <form onSubmit={onSendBook} className="space-y-4">
              <input
                type="email" 
                className="block w-full bg-white dark:bg-[#131624] rounded border-gray-300 dark:border-gray-600" 
                placeholder="Email address"
                {...register('email')}
              />
              <button 
                type="submit" 
                className="appearance-none block w-full sm:w-1/2 md:w-1/3 py-2.5 px-4 bg-orange-500 rounded text-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Send it to me
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}