import NavDrawer from '@/modules/NavDrawer';
import HomeScreen from './home';
import HikingScreen from './hiking';
import RestaurantScreen from './restaurant';

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
  {
    name: 'restaurant',
    title: '餐廳',
    component: RestaurantScreen,
  }
];
export default function Layout() {
  return (
    <NavDrawer routes={routes} />
  );
}