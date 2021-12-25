// "http://192.168.0.107:8080"
// https://educhange.herokuapp.com

import axios from "axios"
import { getLocalStorage } from "../utiles"

const ENDPOINT = "https://educhange.herokuapp.com/api"

async function fetcher(method, path, payload, configs) {
    const responce = await (await axios[method](`${ENDPOINT}${path}`, payload, configs))
    return responce.data
 }
 
class PostService {

    // AUTHENTICATION
    static async unLikeCourse(courseId) {
        const session = getLocalStorage("session")
        const responce = await (await fetch(`${ENDPOINT}/like/delete/${courseId}`, {
            method: "DELETE",
            headers: {
                Authorization: session.token
            }
        })).json()
        return responce
    }

    static async likeCourse(courseId) {
        const session = getLocalStorage("session")
        const responce = await (await fetch(`${ENDPOINT}/like/create/${courseId}`, {
            method: "POST",
            headers: {
                Authorization: session.token
            }
        })).json()
        return responce
    }
    static async updateAva(file) {
        const session = getLocalStorage("session")
        if(file.type === "create") {
            fetcher("post", "/user-image/create", file.data, {
                headers: {
                    Authorization: session.token
                }
            })
        }else if(file.type === "update") {
            fetcher("put", "/user-image/update", file.data, {
                headers: {
                    Authorization: session.token
                }
            })
        }
    }
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
        const response = await fetcher("get", "/category/get-all")
        const categories = [...response.value, {"id": 8,"categoryName": "Другое"}]
        
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

    static async updateCourse(body) {
        console.log(body)

        const session = getLocalStorage("session")

            if(body.file.type === "update") {
                fetcher("put", `/course-image/update/${body.file.id}`, body.file.data, {
                    headers: {
                        Authorization: session.token
                    }
                })
            }else if(body.file.type === "create"){
                fetcher("post", `/course-image/create/${body.file.id}`, body.file.data, {
                    headers: {
                        Authorization: session.token
                    }
                })
            }


        let courseModel = await fetcher("put", "/course/update", body.fields, {
            headers: {
                Authorization: session.token
            }
        })

        const lessons = await fetcher("get", `/lesson/get-all/by-course-id/${body.fields.id}`)

        let result = {
            ...courseModel.value,
            lessons: lessons.value
        }
        return result
    }

    static async setCourseImage(courseId, formData) {
    const session = getLocalStorage("session")
        const responce = await fetcher("post", `/course-image/create/${courseId}`, formData, {
            headers: {
                Authorization: session.token
            }
        })
        return responce
    }

    static async createCourse(body) {
    const session = getLocalStorage("session")
        const responce = await fetcher("post", "/course/create", body, {
            headers: {
                Authorization: session.token
            }
        })

        return responce
    }


    static async removeCourse(courseId) {
    const session = getLocalStorage("session")
        const responce = await (await fetch(`https://educhange.herokuapp.com/api/course/delete/${courseId}`, {
            method: "DELETE",
            headers: {
                Authorization: session.token
            }
        })).json()
        return responce
    }

    static async commentCourse(body) {
    const session = getLocalStorage("session")
        const commentCourse = await fetcher("post", "/comment/create", body, {
            headers: {
                Authorization: session.token
            }
        })
        return commentCourse
    }

    static async saveLesson(lesson) {
    const session = getLocalStorage("session")
        const responce = await fetcher("put", "/lesson/update", lesson, {
            headers: {
                Authorization: session.token
            }
        })
        return responce
    }   

    static async removeLesson(id) {
    const session = getLocalStorage("session")
        const responce = (await fetch(`https://educhange.herokuapp.com/api/lesson/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: session.token
            }
        })).json()
        return responce
    }

    // CREATE
    
    static async createLessons(lessons) {
    const session = getLocalStorage("session")
        lessons.map(async lesson => {
            const responce = await fetcher("post", "/lesson/create", lesson, {
                headers: {
                    Authorization: session.token
                }
            })
            console.log(responce)
        })
    }

    static async createLesson(lesson) {
    const session = getLocalStorage("session")
        const responce = await fetcher("post", "/lesson/create", lesson, {
            headers: {
                Authorization: session.token
            }
        }) 
        return responce
    }

    // PROFILE

    static async getProfile() {
        const session = getLocalStorage("session")
        const userData = await (await fetch(`${ENDPOINT}/user/get-updated-profile`, {
            headers: {
                Authorization: session.token
            }
        })).json()

        return userData
    }


    // PURCHASE

    static async purchaseCourse(courseId) {
        const session = getLocalStorage("session")
        const responce = await (await fetch(`${ENDPOINT}/purchase/create-by-course-id/${courseId}`, {
            method: "POST",
            headers: {
                Authorization: session.token
            }
        })).json()
        console.log(responce)
        return responce
    }    

}

export default PostService