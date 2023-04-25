import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

export const urlResolver = yupResolver(
  yup.object().shape({
    image: yup.string().url().required(),
  })
);
