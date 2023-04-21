import { CTabs } from "src/common/components/others";
import { ITabItems } from "src/common/components/others/types";
import {
  MBuilderText,
  MBuilderFilter,
  MBuilderImage,
  MBuilderParam,
  MBuilderOutput,
} from "../components";
import { useState } from "react";
import { IFilter, IParams, IText } from "src/common/interfaces";
import uniqueId from "lodash.uniqueid";

export const BuilderPage = () => {
  const [texts, setTexts] = useState<IText[]>([
    {
      id: uniqueId("text_"),
      value: "",
      exclude: false,
      multiPrompt: false,
    },
  ]);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [image, setImage] = useState<string>("");
  const [params, setParams] = useState<IParams>({});

  const TabItems: ITabItems = [
    {
      label: "Text",
      component: <MBuilderText value={texts} onChange={setTexts} />,
    },
    {
      label: "Filters",
      component: <MBuilderFilter value={filters} onChange={setFilters} />,
    },
    {
      label: "Images",
      component: <MBuilderImage value={image} onChange={setImage} />,
    },
    {
      label: "Params",
      component: <MBuilderParam value={params} onChange={setParams} />,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row lg:flex gap-4">
      <div className="w-full lg:w-1/3">
        <MBuilderOutput texts={[]} filters={[]} images={[]} params={{}} />
      </div>
      <div className="w-full lg:w-2/3">
        <CTabs items={TabItems} />
      </div>
    </div>
  );
};
