import { ReactNode } from "react";
import ContainerView from "@/modules/ContainerView";

export default function HikingLayout({children}:{children:ReactNode}){
  return (
    <ContainerView>
      {children}
    </ContainerView>
  );
}