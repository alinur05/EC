import {useState} from 'react'

const useIsInputsFilled = inputs => {
    const [errFields, setErrFields] = useState([])

    for(let i in inputs) {
        if(!inputs[i].length) {
            setErrFields([...errFields, i])
        }
    }

    return [errFields]
}


export default useIsInputsFilled