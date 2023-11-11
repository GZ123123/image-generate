import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

export const blogCommentResolver = yupResolver(
  yup.object().shape({
    fullname: yup.string().trim().required(),
    email: yup.string().trim().required().email(),
    profile_url: yup.string().optional().url(),
    content: yup.string().trim().required(),
    parent_id: yup.string().optional().nullable(),
    blog_id: yup.string().optional().nullable(),
  }),
);
