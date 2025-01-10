import usePersistState from "@/hooks/usePersistState";
import { createContext, ReactNode, useContext } from "react";

type Theme = 'dark' | 'light';

type Context = {
  theme:Theme;
  setTheme:(theme:Theme) => void;
}

const GlobalContext = createContext<Context | null>(null);

export default function GlobalContextProvider({children}:{children:ReactNode}){
  const [theme, setTheme] = usePersistState<Theme>('theme','light');
  return (
      <GlobalContext.Provider value={{
          theme:theme,
          setTheme:setTheme
      }}>
          {children}
      </GlobalContext.Provider>
  );
}
export function useGlobalContext(){
  const context = useContext(GlobalContext);

  if(context === undefined || !context?.theme || !context.setTheme){
      throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }
  return context;
}
