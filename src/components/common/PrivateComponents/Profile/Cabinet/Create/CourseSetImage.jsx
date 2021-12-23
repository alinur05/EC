import { Button } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { DARK_BLACK, RED } from '../../../../../../media/colors'
import { finishCreateCourse, resetSteps } from '../../../../../../redux/actions/actions'
import Flex from '../../../../../../UI/Flex'
import {DownloadOutlined} from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

export default function CourseSetImage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [file, setFile] = useState(null)
    const [bg, setBg] = useState(null)

    const data = useSelector(state => state.create.data)

    const handleFinishCreateCourse = () => {
        if(file) {
            const formData = new FormData()
            formData.append("file", file)
            dispatch(finishCreateCourse(formData, data.courseModel.id))
            history.push("/profile")
        }else {
            dispatch(resetSteps())
            history.push("/profile")
        }
    }

    const handleImageChanging = e => {
        setFile(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0])
        setBg(url)
    }


    return (
        <SCourseSetImage>
            <input style={{display: "none"}} type="file" id="courseImage" onChange={handleImageChanging}/>
            <AvaBlock bg={bg}>
                <SetFields>
                    <DownloadOutlined style={{fontSize: "22px"}}/>
                    <SetBtn htmlFor="courseImage">Загрузить</SetBtn>
                </SetFields>
            </AvaBlock>
            <FinishBtn onClick={handleFinishCreateCourse}>Cохранить</FinishBtn>
        </SCourseSetImage>
    )
}

const FinishBtn = styled.button`
    border-radius: 5px;
    border: 1px solid ${DARK_BLACK};
    padding: 8px 13px;
    cursor:pointer;
    background: none;

    &:hover {
        background: ${RED};
        border: 1px solid ${RED};
        color: #fff;
    }
`
const SetBtn = styled.label`
    font-size: 18px;
    cursor:pointer;
`
const SetFields = styled(Flex)`
    flex-direction:column;
    align-items:center;
    cursor:pointer;
    &:hover {
        opacity: 0.8
    }
`
const AvaBlock = styled(Flex)`
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background: #e3e3e3;
    position: relative;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-image: url(${({bg}) => bg || ""});
    background-position:center;
    background-size: cover;
`
const SCourseSetImage = styled(Flex)`
    width: 100%;
    padding: 10px 0px;
    flex-direction:column;
    align-items:center;
    gap: 15px;
`