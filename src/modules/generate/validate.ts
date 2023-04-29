import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

export const promptResolver = yupResolver(
  yup.object().shape({
    image: yup.mixed().required(),
  })
);
