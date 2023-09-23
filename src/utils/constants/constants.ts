import { ROUTES } from "./routes"
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export const AuthTypes = {
    signup: 'signup',
    login: 'login'
}

export const SideBarItems = [
    {
        name: "boards",
        route: ROUTES.BOARDS,
        icon: DashboardRoundedIcon
    },
    {
        name: "home",
        route: ROUTES.HOME,
        icon: HomeRoundedIcon
    },
]