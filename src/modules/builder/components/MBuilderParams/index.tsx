import { IMBuilderParamProps } from "./types";
import { MParamGroup } from "../MParamGroup";

export const MBuilderParams = ({ onChange, params }: IMBuilderParamProps) => {
  return (
    <div>
      {params?.map((param) => (
        <MParamGroup key={param.name} value={12} {...param} />
      ))}
    </div>
  );
};
