type Preparation = {
  title:string;
  note:string;
  data:string[];
};
type Journey = {
  title:string;
  data:{
    subTitle:string;
    content:string;
  }[];
};
export type Article_Home = {
  intro:string;
  preparation:Preparation;
  journey:Journey[];
  outtro:string;
};