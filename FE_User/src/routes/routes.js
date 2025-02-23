import config from "~/config";
import GetStarted from "~/pages/GetStarted";
import Home from "~/pages/Home";
import Login from "~/pages/Account/Login";
import Register from "~/pages/Account/Register";
import RegisterInformation from "~/pages/RegisterInfor";
import Following from "~/pages/Following";
import Profile from "~/pages/Profile";
import Search from "~/components/Search/Search";
import Message from "~/pages/Message";
import AllVenues from "~/pages/AllVenues";
import DetailsVenues from "~/pages/VenuesDetail";
import DefaultLayout from "~/layouts/DefaultLayout/DefaultLayout";
const publicRoutes = [
  { path: config.routes.getstarted, component: GetStarted,layout: DefaultLayout,},
  { path: config.routes.register, component: Register, layout: DefaultLayout },
  { path: config.routes.login, component: Login, layout: DefaultLayout },
  { path: config.routes.registerInfo, component: RegisterInformation, layout: null },
  { path: config.routes.home, component: Home, layout: DefaultLayout },
  { path: config.routes.following, component: Following },
  { path: config.routes.profile, component: Profile }, //ko can @ van tu match
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.message, component: Message, layout: DefaultLayout },
  { path: config.routes.allVenues, component: AllVenues, layout: DefaultLayout },
  { path: config.routes.detailsVenues, component: DetailsVenues, layout: DefaultLayout },
];
const privateRoutes = [
  // router privateRoutes này có thể dùng để ko login ko coi dc
];
export { publicRoutes, privateRoutes };
