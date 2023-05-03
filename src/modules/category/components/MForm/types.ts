import { ICategoryResponse } from "src/apis/category/types";

export interface IMFormProps {
  category: ICategoryForm;
  onSubmit: (data: ICategoryForm) => Promise<ICategoryResponse | null>;
  onClose: () => void;
}

export interface ICategoryForm {
  id?: string;

  image: any;

  name: string;
}
