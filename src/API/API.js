// "http://192.168.0.107:8080"

import axios from "axios"

const ENDPOINT = "https://educhange.herokuapp.com"

const fetcher = async (method, url, body = false, headers = false) => {   
    const responce = await axios[method](`${ENDPOINT}${url}`, body, headers)
    return responce.data
}

class PostService {
    // AUTHENTICATION

    static async sign_up(body) {
        console.log(body)
        const responce = await fetcher("post", "/sign/up", body)
        return responce
    }
    static async sign_in(body) {
        const responce = await fetcher("post", "/sign/in", body)
        return responce
    }

    // COURSES
    static async getAllCourses() {
        const responce = await fetcher("get", "/api/course/get-all")
        return responce
    }
}

export default PostService