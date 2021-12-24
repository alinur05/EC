import Checkbox from 'antd/lib/checkbox/Checkbox'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { DARK_BLACK, YELLOW } from '../../../../../../../media/colors'
import { addLesson, addMyCourseLesson, cleanUpMyCourse, getMyCourseData, setCreateErr, setMyCourseError } from '../../../../../../../redux/actions/actions'
import Error from '../../../../../../../UI/Error'
import Flex from '../../../../../../../UI/Flex'
import { isGoodUrl } from '../../../../../../../utiles'
import playIcon from '../../../../../../../media/play-button.png'
import { useParams } from 'react-router-dom'
import Loader from '../../../../../../../UI/Loader'

export default function Header({id}) {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const loading = useSelector(state => state.myCourse.loading)
    const error = useSelector(state => state.myCourse.error)
    
    // let [isForFree, setIsForFree] = useState(false)

    const [lesson, setLesson] = useState({
        "courseId": id,
        "isVisible": false,
        "lessonInfo": "",
        "lessonUrl": ""
    })

    const handleAddLesson = () => {
        if(lesson.lessonInfo && lesson.lessonUrl) {
            dispatch(addMyCourseLesson(lesson))
            setLesson({
                "courseId": id,
                "isVisible": false,
                "lessonInfo": "",
                "lessonUrl": ""
            })
            handleCloseModal()
        }else {
            dispatch(setMyCourseError("Заполните все поля"))
        }
    }

    const handleCloseModal = () => {
        setVisible(false)
        setLesson({
            "courseId": id,
            "isVisible": false,
            "lessonInfo": "",
            "lessonUrl": ""
        })
        dispatch(setMyCourseError(""))
    }

    return (
        <SHeader>
            <Title>Уроки</Title>
            <AddBtn onClick={() => setVisible(true)}>Добавить +</AddBtn>
            <Modal
            header={false}
            footer={false}
            visible={visible} 
            onCancel={handleCloseModal}>
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
                                {
                                    loading ?
                                        <Loader width='auto' height='auto'/>
                                    :

                                    <CreateBtn onClick={handleAddLesson}>Добавить</CreateBtn>
                                }

                            </Flex>
                            <MyInput
                                width="100%"
                                placeholder='описание урока'
                                value={lesson.lessonInfo}
                                onChange={e => setLesson({...lesson, lessonInfo: e.target.value})}
                            />   
                            <Flex align="center" gap="10px">
                                <Checkbox 
                                    defaultChecked={false}
                                    onChange={e => setLesson({...lesson, isVisible: e.target.checked})}
                                >Показывать бесплатно
                                </Checkbox>
                            </Flex>
                            <Error size="14px" text={error} width="auto" height="auto"/>
                        </Flex>
                </CreateBody>
            </Modal>
        </SHeader>
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
    padding:20px 0px;
    align-items:center;
`
const AddBtn = styled.button`
    border:1px solid #aeaeae;
    background: none;
    padding: 3px 8px;
    font-size: 14px;
    cursor:pointer;
    color: #757575;
    border-radius: 5px;
    &:hover {
        border:1px solid ${DARK_BLACK};
        color:  #000;
    }
`
const Title = styled.h2`
    margin: 0;
    font-size: 32px;
`

const SHeader = styled(Flex)`
    width: 100%;
    height: 50px;
    align-items:center;
    justify-content:space-between;
    border-bottom: 1px solid #e3e3e3;
    padding: 0px 30px
`