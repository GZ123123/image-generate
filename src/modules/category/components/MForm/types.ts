import { ICategoryResponse } from "src/apis/category/types";
import { IAPIResponse } from "src/common/interfaces";

export interface IMFormProps {
  category: ICategoryForm;
  onSubmit: (
    data: ICategoryForm
  ) => Promise<IAPIResponse<ICategoryResponse> | null>;
  onClose: () => void;
}

export interface ICategoryForm {
  id?: string;

  image?: any;

  name?: string;
}
