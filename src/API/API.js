// "http://192.168.0.107:8080"

import axios from "axios"

const ENDPOINT = "https://educhange.herokuapp.com"
const ADMIN_TOKEN = "Basic YWRtaW46YWRtaW4="

async function fetcher(method, path, payload, configs) {
   const responce = await (await axios[method](`${ENDPOINT}${path}`, payload, configs))
   return responce.data
}

class PostService {
    // AUTHENTICATION

    static async sign_up(body) {
        const responce = await fetcher("post", "/sign/up", body)
        return responce
    }
    static async sign_in(body) {
        const responce = await fetcher("post", "/sign/in", body)
        return responce
    }

    // COURSES
    static async getAllCourses() {
        const allCourses = await fetcher("get", "/api/course/get-all")
        const categories = await fetcher("get", "/api/category/get-all")
        return {allCourses, categories}
    }
    static async getCoursesByCategoryId(categories) {
        let coursesSplittedByCategories = categories.map(async category => {
            const responce = await fetcher("get", `/api/course/get-all/by-category-id/${category.id}`)

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
        const fetchLessons = await axios.get(`${ENDPOINT}/api/lesson/get-all/by-course-id/${id}`, {headers: {"Authorization": ADMIN_TOKEN}})

        const responce = await fetcher("get", `/api/course/get/by-id/${id}`)

        let result = {
            ...responce.value,
            lessons: fetchLessons.data.value
        }

        return result
    }
    static async editProfile(body) {

    }
}

export default PostService