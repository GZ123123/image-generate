import { useState } from "react";
import uniqueId from "lodash.uniqueid";

import { CTabs } from "src/common/components/others";
import { ITabItems } from "src/common/components/others/types";
import {
  MBuilderText,
  MBuilderFilter,
  MBuilderImage,
  MBuilderParams,
  MBuilderOutput,
} from "../components";
import { IFilter, IParams, IText } from "src/common/interfaces";
import { IMBuilderPageProps } from "../types";

const defaultText = [
  { id: uniqueId("text_"), value: "", exclude: false, multiPrompt: false },
];

export const BuilderPage = ({ params: paramOptions }: IMBuilderPageProps) => {
  const [texts, setTexts] = useState<IText[]>(defaultText);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [images, setImages] = useState<string[]>([]);
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
      component: <MBuilderImage value={images} onChange={setImages} />,
    },
    {
      label: "Params",
      component: (
        <MBuilderParams
          params={paramOptions}
          value={params}
          onChange={setParams}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row lg:flex gap-4">
      <div className="w-full lg:w-1/3">
        <MBuilderOutput
          texts={texts}
          filters={filters}
          images={images}
          params={params}
        />
      </div>
      <div className="w-full lg:w-2/3">
        <CTabs items={TabItems} />
      </div>
    </div>
  );
};
