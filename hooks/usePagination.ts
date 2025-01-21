import { useState } from "react";

export default function usePagination<T>(
  apiUrl:string,
  init?:{
    page:number;
    list:T[];
    isMore:boolean;
}){
  const [page, setPage] = useState(init?.page || 1);
  const [list, setList] = useState<T[]>(init?.list || []);
  const [isMore, setIsMore] = useState(init?.isMore || false);

  const nextPage = () => setPage(state => state + 1);
  
  const appendList = (newList:T[]) => setList(state => [...state, ...newList]);
  
  const nextUrl = () => getNextPageUrl(apiUrl,page);

  const updatePagination = (newList:T[] | null,isMorePage:boolean) => {
    if(!newList || !newList.length){
      setIsMore(false);
      return 
    }
    nextPage();
    appendList(newList);
    setIsMore(isMorePage);
  };

  return {
    list,
    isMore,
    setIsMore,
    nextUrl,
    updatePagination,
  }
}

//Maybe move to another file
function getNextPageUrl(url:string, currentPage:number){
  const nextPage = currentPage + 1;
  const pageQuery = `${url.search(/\?/) != -1 ? '&' : '?'}page=${nextPage}`;
  const nextUrl = url + pageQuery;
  return nextUrl;
}