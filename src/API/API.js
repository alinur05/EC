// "http://192.168.0.107:8080"

import axios from "axios"

const ENDPOINT = "https://educhange.herokuapp.com"

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
        const responce = await fetcher("get", "/api/course/get-all")
        return responce
    }
}

export default PostService