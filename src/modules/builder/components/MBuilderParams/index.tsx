import { IMBuilderParamProps } from "./types";
import { MParamGroup } from "../MParamGroup";

export const MBuilderParams = ({ onChange, params }: IMBuilderParamProps) => {
  return (
    <div>
      {params?.map((param) => (
        <MParamGroup
          {...param}
          key={param.name}
          value={param.value}
          onChange={(value) => onChange(param.name, value)}
        />
      ))}
    </div>
  );
};
