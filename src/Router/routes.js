import Profile from "../components/common/PrivateComponents/Profile/Profile"
import About from "../components/common/PublicComponents/About"
import Main from "../components/common/PublicComponents/Main"


export const publicRoutes = [
    {path: "/main", component: Main, exact: false},
    {path: "/about", component: About, exact: false},
]

export const privateRoutes = [
    {path: "/main", component: Main, exact: false},
    {path: "/about", component: About, exact: false},
    {path: "/profile", component: Profile, exact: false}
]

