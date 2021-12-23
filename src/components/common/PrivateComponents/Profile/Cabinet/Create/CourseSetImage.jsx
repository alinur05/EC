import { Button } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { finishCreateCourse } from '../../../../../../redux/actions/actions'
import Flex from '../../../../../../UI/Flex'

export default function CourseSetImage() {
    const dispatch = useDispatch()
    const [file, setFile] = useState()
    const data = useSelector(state => state.create.data)

    const handleFinishCreateCourse = () => {
        const formData = new FormData()
        formData.append("file", file)
        dispatch(finishCreateCourse(formData, data.courseModel.id))
    }
    
    return (
        <SCourseSetImage>
            <input type="file" id="courseImage" onChange={e => setFile(e.target.files[0])}/>
            <Button onClick={handleFinishCreateCourse}>Finish</Button>
        </SCourseSetImage>
    )
}

const SCourseSetImage = styled(Flex)`
    width: 100%;
    padding: 10px 0px;
`