import { IFilter, IParams, IText } from "src/common/interfaces";

export interface IMBuilderOutputProps {
  texts: IText[];
  filters: IFilter[];
  image: string;
  params: IParams;
}
