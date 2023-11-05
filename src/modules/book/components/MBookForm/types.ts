import { ICreateOrUpdateBookParams } from 'src/apis/book/types';
import { IAPIResponse } from "src/common/interfaces";

export interface IMBookFormProps {
  onSubmit: (data: any) => Promise<IAPIResponse<any> | null>;
  onCancel: () => void;
  value?: ICreateOrUpdateBookParams;
  edit?: boolean;
}
