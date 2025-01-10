import { setItem, getItem } from "@/utils/asyncStorage";
import { useLayoutEffect, useState } from "react";

export default function usePersistState<T extends string>(key:string, initialValue:T){
  const [value, setValue] = useState<T>(initialValue);

  useLayoutEffect(() => {
    getItem(key).then((value) => {
      if(value && value != initialValue){
        setValue(value as T);
      }
    });
  },[]);

  const setPersistValue = (value:T) => {
    setValue(value);
    setItem(key,value);
  }
  return [value, setPersistValue] as const;
}