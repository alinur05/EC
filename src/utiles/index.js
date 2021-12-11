

export const signupFieldsValidator = (fields) => {
    console.log(fields)

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