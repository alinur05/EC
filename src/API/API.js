// "http://192.168.0.107:8080"

import axios from "axios"
import {getLocalStorage} from "../utiles";

const ENDPOINT = 'https://educhange.herokuapp.com/api'
const ADMIN_TOKEN = "Basic YWRtaW46YWRtaW4="

async function fetcher(method, path, payload, configs) {
    const responce = await (await axios[method](`${ENDPOINT}${path}`, payload, configs))
    return responce.data
 }
 
class PostService {

    // AUTHENTICATION

    static async sign_up(body) {
        const responce = await fetcher("post", "/user/sign-up", body)
        return responce
    }
    static async sign_in(body) {
        const responce = await fetcher("post", "/user/sign-in", body)
        return responce
    }

    // COURSES
    static async getAllCourses() {
        const allCourses = await fetcher("get", "/course/get-all")
        const categories = await fetcher("get", "/category/get-all")
        console.log(categories)
        return {allCourses, categories}
    }
    static async getCoursesByCategoryId(categories) {
        let coursesSplittedByCategories = categories.map(async category => {
            const responce = await fetcher("get", `/course/get-all/by-category-id/${category.id}`)

            const data = {
                categoryName: category.categoryName,
                courses: responce.value
            }

            return data
        })

        let splittedCourses = await Promise.all(coursesSplittedByCategories)
        return splittedCourses
    }
    static async getCourseDetails(id) {
        const fetchLessons = await axios.get(`${ENDPOINT}/lesson/get-all/by-course-id/${id}`, {
            headers: {
                Authorization: ADMIN_TOKEN
            }
        })

        const responce = await fetcher("get", `/course/get/by-id/${id}`)

        let result = {
            ...responce.value,
            lessons: fetchLessons.data.value
        }

        return result
    }
    static async editProfile(body) {
        const response = await fetcher("put", `/user/update`,body, {
            headers: {
                Authorization: getLocalStorage('TOKEN')
            }
        })
        return response
    }
    static async getUserByID(id) {
        const {data} = await axios.get(`${ENDPOINT}/user/get-by-id/${id}`, {
            headers: {
                Authorization: ADMIN_TOKEN
            }
        })
       return data
    }

}

export default PostService