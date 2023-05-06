import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const blogCreateResolver = yupResolver(
  yup.object().shape({
    title: yup.string().required(),
    desciption: yup.string(),
    content: yup.string().required(),
    hashtag_ids: yup.array(yup.string()).optional(),
    is_public: yup.boolean().default(false),
  })
);
