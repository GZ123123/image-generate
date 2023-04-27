import { IAPIResponse } from "src/common/interfaces";
import http from "src/utils/axios";
import { ITextResponse, IUrlResponse } from "./type";

export const generateAPIClient = {
  imageToText(input: string): Promise<IAPIResponse<ITextResponse>> {
    return http.post("/img2prompt/image2text", { input });
  },

  textToImage(input: string): Promise<IAPIResponse<IUrlResponse>> {
    return http.post("/img2prompt/text2image", { input });
  },
};
