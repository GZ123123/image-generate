import { IImageResponse } from "src/apis/image/types";

export interface IMFormProps {
  resource: IResourceForm;
  onSubmit: (data: IResourceForm) => Promise<IImageResponse | null>;
  onClose: () => void;
}

export interface IResourceForm {
  id?: string;

  image?: any;

  key?: string;

  url?: string;
}
