import { SWRConfig, unstable_serialize } from "swr";

import { categoryAPIClient } from "src/apis/category/client";
import { imageAPIClient } from "src/apis/image/client";
import { BuilderPage } from "src/modules/builder/pages";
import { PARAM_TYPE } from "src/common/constants/enum";
import { IMBuilderParamItem } from "src/modules/builder/components/types";

interface IBuilderProps {
  initialCategory: string;
  fallback: { [key: string]: any };
}

const params: IMBuilderParamItem[] = [
  {
    name: "--v",
    label: "Version",
    type: PARAM_TYPE.SELECT,
    options: [
      { value: "5", label: "v5" },
      { value: "4", label: "v4" },
      { value: "3", label: "v3" },
      { value: "2", label: "v2" },
      { value: "1", label: "v1" },
    ],
    value: "4",
  },
  {
    name: "--ar",
    label: "Aspect Ratio",
    type: PARAM_TYPE.INPUT_RADIO,
    placeholder: "16:9",
  },
  {
    name: "--chaos",
    label: "Chaos",
    type: PARAM_TYPE.INPUT_RADIO,
    placeholder: "0-100",
  },
  {
    name: "--iw",
    label: "Image Weight",
    type: PARAM_TYPE.INPUT_RADIO,
    placeholder: "0.5-2",
  },
  {
    name: "--upbeta",
    label: "Upbeta",
    type: PARAM_TYPE.BOOLEAN,
  },
  {
    name: "--s",
    label: "Stylize",
    type: PARAM_TYPE.INPUT_RADIO,
    placeholder: "0-1000",
  },
  {
    name: "--seed",
    label: "Seed",
    type: PARAM_TYPE.INPUT_RADIO,
    placeholder: "0-4294967295",
  },
  {
    name: "--tile",
    label: "Tile",
    type: PARAM_TYPE.BOOLEAN,
  },
  {
    name: "--niji",
    label: "Anime Style",
    type: PARAM_TYPE.BOOLEAN,
  },
  {
    name: "--q",
    label: "Quality",
    type: PARAM_TYPE.INPUT_RADIO,
    placeholder: "0.25-5",
  },
  {
    name: "--uplight",
    label: "Light Upscale",
    type: PARAM_TYPE.BOOLEAN,
  },
  {
    name: "--stop",
    label: "Stop Earlier At",
    type: PARAM_TYPE.INPUT_RADIO,
    placeholder: "10-100",
  },
];

export default function Builder({ initialCategory, fallback }: IBuilderProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <BuilderPage initialCategory={initialCategory} params={params} />
    </SWRConfig>
  );
}

export async function getServerSideProps(): Promise<{ props: IBuilderProps }> {
  const categories = await categoryAPIClient.get();

  const initialCategory = categories.data[0]._id;

  const images = await imageAPIClient.get({ category_id: initialCategory });

  return {
    props: {
      initialCategory: initialCategory,
      fallback: {
        [unstable_serialize(["blogs", "category", initialCategory])]:
          categories.data,
        images: images.data,
      },
    },
  };
}
