import About from "../components/pages/About"
import Main from "../components/pages/Main"
import Profile from "../components/pages/Profile"
import CourseDetails from '../components/pages/CourseDetails'
import ResetPassword from "../components/pages/ResetPassword"
import SearchQuery from "../components/pages/SearchQuery"
import SearchCategory from "../components/pages/SearchCategory"
import Create from "../components/pages/Create"


export const publicRoutes = [
    {path: "/main", component: Main},
    {path: "/about", component: About},
    {path: "/courses/details/:id", component: CourseDetails, exact: true},
    {path: "/api/mail/reset-password", component: ResetPassword},
    {path: "/category/:categoryName", component: SearchCategory, exact: true},
    {path: "/search/:query", component: SearchQuery, exact: true},
]

export const privateRoutes = [
    {path: "/main", component: Main},
    {path: "/about", component: About},
    {path: "/courses/details/:id", component: CourseDetails, exact: true},
    {path: "/profile", component: Profile, exact: true},
    {path: "/api/mail/reset-password", component: ResetPassword},
    {path: "/category/:categoryName", component: SearchCategory, exact: true},
    {path: "/search/:query", component: SearchQuery, exact: true},
    {path: "/profile/create", component: Create, exact:true},
]

