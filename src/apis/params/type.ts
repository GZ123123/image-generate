import { PARAM_TYPE } from "src/common/constants/enum";
import { IPaginationParams } from "src/common/interfaces";

export interface IParamPaginationParams extends IPaginationParams {}

export interface IParamRequest {
  name?: string;

  value?: string;

  key?: string[];

  type?: PARAM_TYPE;
}

export interface IPublicParamResponse {
  _id: string;

  name: string;

  key: string[];

  type: PARAM_TYPE;
}

export interface IParamResponse {
  _id: string;

  name: string;

  key: string;

  type: PARAM_TYPE;
}
