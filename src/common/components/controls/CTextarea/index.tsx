import { TextField } from "@mui/material";
import { ICTextArea } from "./type";
import { classNames } from "src/utils/class-names";
import { forwardRef } from "react";

const CTextAreaInner = (
  { id, label, value, className, ...props }: ICTextArea,
  ref: React.ForwardedRef<any>
) => {
  return (
    <div>
      {label && (
        <label className="capitalize" htmlFor={id}>
          {label}
        </label>
      )}
      <TextField
        ref={ref}
        multiline
        {...props}
        value={value}
        className={classNames(className, "w-full")}
      />
    </div>
  );
};

export const CTextArea = forwardRef(CTextAreaInner);

CTextArea.defaultProps = {
  rows: 3,
};
