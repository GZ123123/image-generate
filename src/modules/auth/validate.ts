import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const loginResolver = yupResolver(
  yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  })
);
