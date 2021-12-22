

export const signupFieldsValidator = (fields) => {
    let result = {
        isValid: true,
        error: ""
    }

    for(let i in fields) {
        if(!fields[i].length) {
            result.isValid = false
            result.error = "Заполните все поля!"
            break
        }
    }

    if(fields.password !== fields.repeat_password) {
        result.isValid = false
        result.error = "Неверный пароль"
    }

    return result
}

// LOCAL STORAGE

export const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key))
export const removeLocalStorage = (key = "session") => localStorage.removeItem(key)
export const setLocalStorage = (key = "session", value) => localStorage.setItem(key, JSON.stringify(value))


// LESSON

export const lessonUrlEditor = (url) => {
    let result = ''
        let endpoint = url.slice(0, 8)
        if(endpoint !== "https://") {
            return '#'
        }

        result = url
    return result
}



