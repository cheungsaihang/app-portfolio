import ApiPath from "@/constants/ApiPath";
import TagsSelector from "@/modules/TagsSelector";
import callApi from "@/utils/callApi";
import { useEffect, useState } from "react"
import { LoadingTags } from "./_loading";

const firstTag = '全部';

export default function RestaurantTags({
  onChangeTag
}:{
  onChangeTag?:(index:number, tag:string) => void  
}){
  const [isPending, setPending] = useState(true);
  const [tags, setTags] = useState<string[]>([firstTag]);
  const apiUrl = ApiPath.tags + '/restaurant';

  useEffect(() => {
    callApi(
      apiUrl,
      undefined,
      {
        onSuccess:(res:string[]) => setTags([firstTag, ...res]),
        onFinally:() => setPending(false)
      }
    );
  },[]);

  return (
    <>
      {
        isPending ? (
          <LoadingTags />
        ) : (
          <TagsSelector tags={tags} onPress={onChangeTag} />
        )}
    </>
  )
}