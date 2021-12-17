import About from "../components/pages/About"
import Main from "../components/pages/Main"
import Profile from "../components/pages/Profile"



export const publicRoutes = [
    {path: "/main", component: Main, exact: false},
    {path: "/about", component: About, exact: false},
]

export const privateRoutes = [
    {path: "/main", component: Main, exact: false},
    {path: "/about", component: About, exact: false},
    {path: "/profile", component: Profile, exact: false}
]

