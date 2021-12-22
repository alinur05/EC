// "http://192.168.0.107:8080"
// https://educhange.herokuapp.com

import axios from "axios"

const ENDPOINT = "http://192.168.0.107:8080/api"
const ADMIN_TOKEN = "Basic YWRtaW46YWRtaW4="

async function fetcher(method, path, payload, configs) {
    const responce = await (await axios[method](`${ENDPOINT}${path}`, payload, configs))
    return responce.data
 }
 
class PostService {

    // AUTHENTICATION

    static async sign_up(body) {
        try {
            const responce = await fetcher("post", "/user/sign-up", body)
            return responce
        }catch(e) {
            console.log("ERROR: ", e)
        }
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
        const lessons = await fetcher("get", `/lesson/get-all/by-course-id/${id}`)
        const responce = await fetcher("get", `/course/get/by-id/${id}`)

        let result = {
            ...responce.value,
            lessons: lessons.value
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

    static async setCourseImage(courseId, file, token) {
        const responce = await fetcher("post", `/course-image/create/${courseId}`, file, {
            headers: {
                Authorization: token
            }
        })
        console.log(responce)
        return responce
    }

    static async createCourse(body, token) {
        const responce = await fetcher("post", "/course/create", body, {
            headers: {
                Authorization: token
            }
        })

        return responce
    }

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

    // BALANCE

    static async getBalance(userId, token) {
        const responce = await fetcher("get", `/balance/get-by-user-id/${userId}`, null, {
            headers: {
                Authorization: token
            }
        })
        return responce
    }

    // PROFILE

    static async getProfile(id, token) {
        const userModelToSend = await (await fetch(`/user/get-by-id/${id}`, {
            method: "GET",
            headers: {
                Authorization: token
            }
        })).json()

        const userBalanceModel = await this.getBalance(id, token)

        const result = {
            userModelToSend: userModelToSend,
            userBalanceModel: userBalanceModel.value
        }

        console.log(result)
        return result   
    }
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

    // PURCHASE

    static async purchaseCourse(courseId, token) {
        const responce = await fetcher("post", `/purchase/create-by-course-id/${courseId}`, null, {
            headers: {
                Authorization: token
            }
        })
        return responce
    }    
}

export default PostService