import About from "../components/pages/About"
import Category from "../components/pages/Category"
import Main from "../components/pages/Main"
import Profile from "../components/pages/Profile"
import CourseDetails from '../components/pages/CourseDetails'
import ResetPassword from "../components/pages/ResetPassword"
import BoughtCourseDetails from "../components/pages/BoughtCourseDetails";


export const publicRoutes = [
    {path: "/main", component: Main},
    {path: "/about", component: About},
    {path: "/courses/details/:id", component: CourseDetails, exact: true},
    {path: "/category/:name", component: Category, exact: true},
    {path: "/api/mail/reset-password", component: ResetPassword, exact: true},
    {path: "/bought/courses", component: BoughtCourseDetails},

]

export const privateRoutes = [
    {path: "/main", component: Main, exact: false},
    {path: "/about", component: About, exact: false},
    {path: "/category/:name", component: Category, exact: true},
    {path: "/courses/details/:id", component: CourseDetails, exact: true},
    {path: "/profile", component: Profile, exact: false},
    {path: "/api/mail/reset-password", component: ResetPassword, exact: true},
    {path: "/bought/courses", component: BoughtCourseDetails},

]

