import NavDrawer from '@/modules/NavDrawer';
import HomeScreen from '.';
import HikingScreen from './hiking';

const routes = [
  {
    name: 'home',
    title: '主頁',
    component: HomeScreen,
  },
  {
    name: 'hiking',
    title: '行山',
    component: HikingScreen,
  },
];
export default function Layout() {
  return (
    <NavDrawer routes={routes} />
  );
}