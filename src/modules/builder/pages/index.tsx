import { useMemo, useState } from "react";
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
import { IParams, IText } from "src/common/interfaces";
import { IMBuilderPageProps } from "../types";
import { IImageResponse } from "src/apis/image/types";

const defaultText = () => [
  { id: uniqueId("text_"), value: "", exclude: false, multiPrompt: false },
];

export const BuilderPage = ({ params }: IMBuilderPageProps) => {
  const [texts, setTexts] = useState<IText[]>(defaultText());
  const [filters, setFilters] = useState<IImageResponse[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [paramValues, setParamValues] = useState<IParams>({});

  const paramsOptions = useMemo(() => {
    return params?.map((param) => ({
      ...param,
      value: paramValues[param.name],
    }));
  }, [params, paramValues]);

  const onParamChange = (key: string, value: string | number | boolean) => {
    setParamValues({ ...paramValues, [key]: value });
  };

  const onReset = () => {
    console.log("reset");
    setTexts(defaultText());
    setFilters([]);
    setImages([]);
    setParamValues({});
  };

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
        <MBuilderParams params={paramsOptions} onChange={onParamChange} />
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
          params={paramValues}
          onReset={onReset}
        />
      </div>
      <div className="w-full lg:w-2/3">
        <CTabs items={TabItems} />
      </div>
    </div>
  );
};
