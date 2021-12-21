// "http://192.168.0.107:8080"
// https://educhange.herokuapp.com

import axios from "axios"

const ENDPOINT = "https://educhange.herokuapp.com/api"
const ADMIN_TOKEN = "Basic YWRtaW46YWRtaW4="

async function fetcher(method, path, payload, configs) {
    const responce = await (await axios[method](`${ENDPOINT}${path}`, payload, configs))
    return responce.data
 }
 
class PostService {

    // AUTHENTICATION

    static async sign_up(body) {
        const responce = await fetcher("post", "/user/sign-up", body)
        console.log(responce)
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
        const fetchLessons = await axios.get(`${ENDPOINT}/lesson/get-first-three/by-course-id/${id}`)

        const responce = await fetcher("get", `/course/get/by-id/${id}`)

        let result = {
            ...responce.value,
            lessons: fetchLessons.data.value
        }

        return result
    }

    static async getCourseByCategory(name) {
        const responce = await fetcher("get", `/course/get-all/by-category-name/${name}`)
        return responce
    }


    static async getCourseByQuery(query) {
        const responce = await fetcher("get", `/course/get-all/by-name/${query}`)
        return responce
    }   

    // COURSE

    static async commentCourse(body, token) {
        console.log(token)
        const commentCourse = await fetcher("post", "/comment/create", body, {
            headers: {
                Authorization: token
            }
        })
        console.log(commentCourse)
        return commentCourse
    }

    // PROFILE
    static async editProfile(body) {

    }
    static async editAva(file, token) {
        const responce = await fetcher("put", "/user-image/update", file, {
            headers: {
                Authorization: token
            }
        })
        return responce
    }
}

export default PostService