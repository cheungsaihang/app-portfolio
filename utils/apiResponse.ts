import { API_Error, API_Success } from "@/types/api/defaultTypes";

type ResponseBody = object | string | unknown;

export function isErrorResponse(result: API_Success<ResponseBody> | API_Error): result is API_Error {
  if(isErrorResponseCode(result.code)){
    return true;
  }
  return false;
}

function isErrorResponseCode(code:number){
  return ![200,201,202,203,204].includes(code);
}