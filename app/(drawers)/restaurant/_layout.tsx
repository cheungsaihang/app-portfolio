import { ReactNode } from "react";
import ContainerView from "@/modules/ContainerView";

export default function RestaurantLayout({children}:{children:ReactNode}){
  return (
    <ContainerView>
      {children}
    </ContainerView>
  );
}