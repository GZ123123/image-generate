import { SWRConfig } from "swr";

import { categoryAPIClient } from "src/apis/category/client";
import { imageAPIClient } from "src/apis/image/client";
import { BuilderPage } from "src/modules/builder/pages";
import { ICategoryResponse } from "src/apis/category/types";
import { IImageResponse } from "src/apis/image/types";
import { PARAM_TYPE } from "src/common/constants/enum";
import { IMBuilderParamItem } from "src/modules/builder/components/types";

interface IBuilderProps {
  fallback: { categories: ICategoryResponse[]; images: IImageResponse };
}

const params: IMBuilderParamItem[] = [
  {
    name: "--v",
    label: "Version",
    type: PARAM_TYPE.SELECT,
    options: ["v5", "v4", "v3", "v2", "v1"],
  },
  {
    name: "--ar",
    label: "Aspect Ratio",
    type: PARAM_TYPE.INPUT_RADIO,
  },
  {
    name: "--chaos",
    label: "Chaos",
    type: PARAM_TYPE.INPUT_RADIO,
  },
  {
    name: "--iw",
    label: "Image Weight",
    type: PARAM_TYPE.INPUT_RADIO,
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
  },
  {
    name: "--seed",
    label: "Seed",
    type: PARAM_TYPE.INPUT_RADIO,
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
  },
];

export default function Builder({ fallback }: IBuilderProps) {
  return (
    <SWRConfig value={{ fallback }}>
      <BuilderPage params={params} />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const categories = await categoryAPIClient.get();

  const initCategory = categories.data[0]._id;

  const images = await imageAPIClient.get({ category_id: initCategory });

  return { props: { categories: categories.data, images: images.data } };
}
