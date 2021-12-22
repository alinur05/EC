import { Button } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../../../UI/Flex'
import LessonList from './LessonList'

export default function CourseLessons({onClick}) {
    const lessons = useSelector(state => state.create.lessons) || []
    const data = useSelector(state => state.create.data)

    const [lesson, setLesson] = useState({
        "courseId": data.courseModel.id,
        "isVisible": false,
        "lessonInfo": "",
        "lessonUrl": ""
    })

    return (
        <Lesson>
            <LessonList data={lessons} />
            <CreateBody>
                <VideoWrapper>
                    <iframe width="100%" src={lesson.lessonUrl} title="Title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                </VideoWrapper>
                <MyInput
                    placeholder='url урока'
                    value={lesson.lessonUrl}
                    onChange={e => setLesson({...lesson, lessonUrl: e.target.value})}
                >   
                </MyInput>
            </CreateBody>   
            <Footer>
                <NextBtn onClick={onClick}>Далее</NextBtn>
            </Footer>
        </Lesson>
    )
}

const VideoWrapper = styled(Flex)`
`
const MyInput = styled.input`
    outline: none;
    width: 100%;
    font-size: 20px;
    border-radius: 5px;
`
const CreateBody = styled(Flex)`

`
const NextBtn = styled.button`
    font-size: 20px;
    border: 1px solid #e3e3e3;
    background: none;
    cursor:pointer;
    border-radius: 5px;
    padding: 5px 8px;
    &:hover {
     border: 1px solid #aeaeae;
    }
`
const Footer = styled(Flex)`
    width: 100%;
    padding: 10px 0px;
    justify-content:flex-start;
` 

const Lesson = styled(Flex)`
    flex-direction:column;
    width: 100%;
    padding: 10px 0px;
    gap: 20px;
`