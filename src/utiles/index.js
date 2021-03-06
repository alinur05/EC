import it from '../media/categoryImages/it.jpg'
import business from '../media/categoryImages/business.jpg'
import marketing from '../media/categoryImages/Marketing.jpg'
import sport from '../media/categoryImages/sport.jpg'
import art from '../media/categoryImages/art.jpg'
import design from '../media/categoryImages/desine.jpg'
import music from '../media/categoryImages/music.jpg'
import others from '../media/defultCourseImage.png'

export const getImageOnCategory = categoryId => {
    switch(categoryId) {
        case 1:
            return it
        case 2:
            return business
        case 3:
            return marketing
        case 4:
            return sport
        case 5: 
            return art
        case 6:
            return design
        case 7:
            return music
        case 8:
            return others
        default:
            return others
    }
}

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

// COURSE CREATE

export const isGoodUrl = (url) => (url.includes("https://www.youtube.com/"))

// CATEGORIES

export const getCategoriesCapitaled = categories => {
    const result = categories.map(item => {
        if(item.categoryName === "it") {
            let maped = {
                ...item,
                categoryName: item.categoryName.toUpperCase()
            }
            return maped
        }

        let capitalled = item.categoryName.split('')
        let upped = capitalled[0].toUpperCase()
        capitalled.splice(0, 1, upped)
        let maped = {
            ...item,
            categoryName: capitalled.join('')
        }
        return maped
    })
    return result
}


export const handleShortTitle = text => {
    if(text.length < 75) return text

    let result = text.slice(0, 90)
    result += "..."
    return result
}

export const getUsername = email => {
    let ind = null
    for(let i = 0; i < email.length; i++) {
        if(email[i] === "@") {
            ind = i
        }
    }

    return email.slice(0, ind)
}


export const checkEmail = str => {
    if(!str) return true

    if(str.includes("@")) {
        return true
    }else return false
}
export const checkNumber = num => {
    if(!num) {
        return true
    }
    
    if(num.length > 9 && num[0] === "0") {
        return true
    }else {
        return false
    }
}
