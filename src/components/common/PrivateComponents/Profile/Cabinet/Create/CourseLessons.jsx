import { Button } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../../../UI/Flex'
import { isGoodUrl } from '../../../../../../utiles'
import LessonList from './LessonList'
import playIcon from '../../../../../../media/play-button.png'
import { useDispatch } from 'react-redux'
import { addLesson, createLessons, setCreateErr } from '../../../../../../redux/actions/actions'
import { YELLOW } from '../../../../../../media/colors'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import Loader from '../../../../../../UI/Loader'
import Error from '../../../../../../UI/Error'

export default function CourseLessons({onClick}) {
    const lessons = useSelector(state => state.create.lessons) || []
    const data = useSelector(state => state.create.data) || {}
    const dispatch = useDispatch()
    const loading = useSelector(state => state.create.loading)
    const error = useSelector(state => state.create.error)
    
    const [lesson, setLesson] = useState({
        "courseId": data.courseModel.id,
        "isVisible": false,
        "lessonInfo": "",
        "lessonUrl": ""
    })

    const handleAddLesson = () => {
        if(lesson.lessonInfo && lesson.lessonUrl) {
            dispatch(addLesson(lesson))
            setLesson({
                "courseId": data.courseModel.id,
                "isVisible": false,
                "lessonInfo": "",
                "lessonUrl": ""
            })
        }else {
            dispatch(setCreateErr("Заполните все поля"))
        }
    }


    const handleLessonsStep = () => {
        dispatch(createLessons(lessons))
    }

    return (
        <Lesson>
            {
                loading ?
                    <Loader />
                :
                <>   
                    <LessonList data={lessons} />
                    <CreateBody>
                        <VideoWrapper>
                            {
                                isGoodUrl(lesson.lessonUrl) ?
                                    <iframe width="100%" src={lesson.lessonUrl} title="Title" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                    </iframe>
                                :
                                    <Img src={playIcon} />
                            }
                        </VideoWrapper>
                        <Flex width="65%" direction="column" gap="15px">
                            <Flex width="100%">
                                <UrlInput
                                    width="100%"
                                    placeholder='url урока'
                                    value={lesson.lessonUrl}
                                    onChange={e => setLesson({...lesson, lessonUrl: e.target.value})}
                                />   
                                <CreateBtn onClick={handleAddLesson}>Добавить</CreateBtn>
                            </Flex>
                            <MyInput
                                width="100%"
                                placeholder='описание урока'
                                value={lesson.lessonInfo}
                                onChange={e => setLesson({...lesson, lessonInfo: e.target.value})}
                            />   
                            <Flex align="center" gap="10px">
                                <Checkbox 
                                    onChange={e => setLesson({...lesson, isVisible: e.target.checked})}
                                >Показывать бесплатно
                                </Checkbox>
                            </Flex>
                            <Error size="14px" text={error} width="auto" height="auto"/>
                        </Flex>
                    </CreateBody>   
                </>
            }
            <Footer>
                <NextBtn onClick={handleLessonsStep}>Далее</NextBtn>
            </Footer>
        </Lesson>
    )
}

const CreateBtn = styled.button`
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: none;
    font-size: 14px;
    height: 100%;
    padding: 11px;
    cursor:pointer;
    background: ${YELLOW}
`
const Img = styled.img`
    width: 100%;
    height: 100%;
`
const VideoWrapper = styled(Flex)`
    width: 200px;
`
const MyInput = styled.input`
    width: ${({width}) => width || "300px"};
    padding: 10px 15px;
    outline: none;
    color: #676E8B;
    border-radius: 5px;
    font-size: 14px;
    border: 1px solid #DAE2F2;
`
const UrlInput = styled(MyInput)`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
`
const CreateBody = styled(Flex)`
    width: 100%;
    gap: 20px;
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
    justify-content:flex-end;
` 

const Lesson = styled(Flex)`
    flex-direction:column;
    width: 100%;
    padding: 10px 0px;
    gap: 20px;
`