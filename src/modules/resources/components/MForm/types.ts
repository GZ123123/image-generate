import { IImageResponse } from "src/apis/image/types";
import { IAPIResponse } from "src/common/interfaces";

export interface IMFormProps {
  resource: IResourceForm;
  onSubmit: (
    data: IResourceForm
  ) => Promise<IAPIResponse<IImageResponse> | null>;
  onClose: () => void;
}

export interface IResourceForm {
  id?: string;

  image?: any;

  key?: string;

  url?: string;
}
