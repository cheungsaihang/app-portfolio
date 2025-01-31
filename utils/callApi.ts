import { API_Error, API_Success } from '@/types/api/defaultTypes';
import { fetch, FetchRequestInit } from 'expo/fetch';
import { isErrorResponse } from './apiResponse';

export default async function callApi(
  path:string,
  init:FetchRequestInit | undefined,
  callback:{
    onStart?:() => void,
    onSuccess:(res:any) => void,
    onError?: (err:any) => void,
    onFinally?:() => void
  }
){
  const { onStart, onSuccess, onError, onFinally } = callback;
  typeof onStart === 'function' && onStart();
  fetchApi(
    path,
    init
  ).then((res) => {
    if(isErrorResponse(res)){
      typeof onError === 'function' && onError(res);
    }
    else {
      onSuccess(res.result);
    }
  })
  .finally(() => {
    typeof onFinally === 'function' && onFinally();
  });
}

export async function fetchApi(
  path:string,
  init:FetchRequestInit | undefined
){
  const url = process.env.EXPO_PUBLIC_API_ENDPOINT + path;
  const options:FetchRequestInit = {
    method: init?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...init?.headers,
    },
    body: init?.body
  }
  try{
    const res = await fetch(url, options);
    const json = await res.json() as API_Success<any> | API_Error;
    return json;
  }
  catch(e){
    const error = handleException(e);
    return error;
  }
}

function handleException(e:unknown):API_Error{
  console.log('Call API Exception', e);
  if(typeof e === 'string'){
    if(e.search(/timed out/i) >=0 || e.search(/time out/i) >=0){
      return {
        code:901,
        error:{
          short:'timed_out',
          message:e
        }
      };
    }
  }
  return{
    code:900,
    error:{
      short:'undefined_error',
      message: 'undefined_error'
    }
  };
}