import About from "../components/pages/About"
import Category from "../components/pages/Category"
import Main from "../components/pages/Main"
import Profile from "../components/pages/Profile"



export const publicRoutes = [
    {path: "/main", component: Main},
    {path: "/about", component: About},
    {path: "/category/:name", component: Category, exact: true}
]

export const privateRoutes = [
    {path: "/main", component: Main, exact: false},
    {path: "/about", component: About, exact: false},
    {path: "/profile", component: Profile, exact: false}
]

