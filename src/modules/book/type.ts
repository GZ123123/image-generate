import { IBooksResponse, ICreateOrUpdateBookParams } from 'src/apis/book/types';

export interface IBookPageProps {
  books: IBooksResponse[];
}

export interface IMBookUpdatePageProps {
  id: string;

  book: ICreateOrUpdateBookParams;

  defaultImageUrl?: string;
}
