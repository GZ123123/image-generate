import { InputHTMLAttributes } from "react";

export interface ICUploadProps<TElement>
  extends Omit<InputHTMLAttributes<TElement>, "onChange"> {
  id: string;

  name: string;

  onChange: (value: File | undefined) => void;
}
