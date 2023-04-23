import { useState } from "react";
import uniqueId from "lodash.uniqueid";

import { CTabs } from "src/common/components/others";
import { ITabItems } from "src/common/components/others/types";
import {
  MBuilderText,
  MBuilderFilter,
  MBuilderImage,
  MBuilderParam,
  MBuilderOutput,
} from "../components";
import { IFilter, IParams, IText } from "src/common/interfaces";
import { IMBuilderPageProps } from "../types";

export const BuilderPage = ({
  categories,
  images,
  params: paramOptions,
  onSearch,
}: IMBuilderPageProps) => {
  const [texts, setTexts] = useState<IText[]>([
    {
      id: uniqueId("text_"),
      value: "",
      exclude: false,
      multiPrompt: true,
    },
    {
      id: uniqueId("text_"),
      value: "asd",
      exclude: true,
      multiPrompt: true,
      weight: 12,
    },
    {
      id: uniqueId("text_"),
      value: "123",
      exclude: false,
      multiPrompt: false,
    },
    {
      id: uniqueId("text_"),
      value: "zxc",
      exclude: false,
      multiPrompt: false,
      weight: 12,
    },
    {
      id: uniqueId("text_"),
      value: "qwe",
      exclude: false,
      multiPrompt: true,
    },
    {
      id: uniqueId("text_"),
      value: "vbn",
      exclude: false,
      multiPrompt: true,
      weight: 12,
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
      component: (
        <MBuilderFilter
          categories={categories}
          images={images}
          onSearch={onSearch}
          value={filters}
          onChange={setFilters}
        />
      ),
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
        <MBuilderOutput
          texts={texts}
          filters={filters}
          image={image}
          params={params}
        />
      </div>
      <div className="w-full lg:w-2/3">
        <CTabs items={TabItems} />
      </div>
    </div>
  );
};
