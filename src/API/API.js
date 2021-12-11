// "http://192.168.0.107:8080"

const ENDPOINT = "http://192.168.0.107:8080"

class PostService {
    static async sign_up(body) {
        const responce = await (await fetch(`${ENDPOINT}/sign/up`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        })).json()
        return responce
    }
    static async sign_in(body) {
        const responce = await (await fetch(`${ENDPOINT}/sign/in`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })).json()
        return responce
    }
    static async getAllCourses() {
        const responce = await (await fetch(`${ENDPOINT}/api/course/get-all`)).json()
        return responce
    }
}

export default PostService