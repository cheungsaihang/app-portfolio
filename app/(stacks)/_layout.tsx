import { Slot, usePathname, Redirect } from 'expo-router';
import { useAuthStore } from '@/hooks/zustand/useAuthStore';

export default function Middleware() {
  const auth = useAuthStore();
  const pathname = usePathname();

  if(protectedRoutes().includes(pathname)){
    if(!auth.sid){
      return <Redirect href={'/(drawers)'} />;
    }
  }

  return <Slot />;
}

function protectedRoutes(){
  const protectedRoutes = ['/profile'];
  return protectedRoutes;
}