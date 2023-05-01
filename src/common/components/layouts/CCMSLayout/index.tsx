import { ICCMSLayoutProps } from "./types";
import { CAuthenticate } from "../CAuthenticate";

export const CCMSLayout = ({ children }: ICCMSLayoutProps) => {
  return (
    <CAuthenticate>
      <div>{children}</div>
    </CAuthenticate>
  );
};
