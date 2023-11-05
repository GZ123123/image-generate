import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const bookCreateResolver = yupResolver(
  yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    image_id: yup.string().required(),
    url: yup.string().trim().required().url(),
    is_pin: yup.boolean().default(false),
  })
);
