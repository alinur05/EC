import { DeleteOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import styled, {css} from 'styled-components'
import Flex from '../../../../../../UI/Flex'
import { handleShortTitle, isGoodUrl } from '../../../../../../utiles'
import player from '../../../../../../media/play-button.png'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import { RED } from '../../../../../../media/colors'
import { useDispatch } from 'react-redux'
import { removeLesson } from '../../../../../../redux/actions/actions'
import { useHistory } from 'react-router-dom'
import {Modal} from 'antd'
import {DARK_BLACK, YELLOW} from '../../../../../../media/colors'
import {WarningOutlined} from '@ant-design/icons'

export default function LessonList({data}) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [visible, setVisible] = useState(false)

    const handleRemoveLesson = id => {
        setVisible(false)
        dispatch(removeLesson(id))
    }

    return (
        <SLessonList>
            {
                data.map((lesson, index) => 
                <Card
                    key={lesson.id}
                    timeout={2000}
                    classNames="item"
                >
                    <Lesson>
                        <VideoBlock>
                            {
                                isGoodUrl(lesson.lessonUrl) ?
                                    <iframe width="100%" height="100%" src={lesson.lessonUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                :
                                    <Img 
                                        src={player}
                                        alt='player'
                                    />
                            }
                        </VideoBlock>
                        <Body>
                            <Desc>
                                {handleShortTitle(lesson.lessonInfo)}
                            </Desc>
                            <AdjustBlock>
                                <span>
                                    {
                                        lesson.isVisible ?
                                            <EyeOutlined style={{fontSize: "20px"}} />
                                        :
                                            <LockOutlined style={{fontSize: "20px"}}/>
                                    }
                                </span>
                                <RemoveBtn onClick={() => setVisible(true)}>
                                    <DeleteOutlined />
                                </RemoveBtn>
                                <Modal 
                                header={false}
                                footer={false}
                                visible={visible} 
                                onCancel={() => setVisible(false)}>
                                    <Flex direction="column" align="center" gap="10px">
                                        <WarningOutlined style={{color:YELLOW, fontSize: "48px"}} />
                                        <WarnText>Вы уверены?</WarnText>
                                        <Flex gap="10px" justify="center" width="100%">
                                            <ModalBtn onClick={() => setVisible(false)}>отмена</ModalBtn>
                                            <ModalBtn delete onClick={() => handleRemoveLesson(lesson.id)}>удалить</ModalBtn>
                                        </Flex>
                                    </Flex>
                                </Modal>
                            </AdjustBlock>
                        </Body>
                    </Lesson>
                </Card>
                )
            }
        </SLessonList>
    )
}

const WarnText = styled.h3`
    font-size: 24px;
`
const ModalBtn = styled.button`
    font-size: 16px;
    padding: 3px 13px;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    background: none;
    cursor:pointer;
    &:hover {
        border: 1px solid ${DARK_BLACK};
        ${props => props.delete && css`
            border: 1px solid ${RED};
            color: ${RED};
        `}
    }
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit:contain;
`
const RemoveBtn = styled.button`
    background: none;
    border:none;
    cursor:pointer;
    font-size: 20px;
    transition: 0;
    &:hover {
        color: ${RED};
    }
`
const AdjustBlock = styled(Flex)`
    width: 100%;
    justify-content:space-between;
    align-items:center;
`
const Desc = styled.p`
    font-size: 14px;
    margin: 0;
`
const Body = styled(Flex)`
    width: 60%;
    height: 100%;
    flex-direction:column;
    padding: 0px 10px;
    justify-content:space-between;
`
const VideoBlock = styled(Flex)`
    width: 40%;
    height: 100%;
`
const Lesson = styled(Flex)`
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 30px #e3e3e3;
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
const Card = styled(CSSTransition)`
    width: 100%;
    background: #fff;
    box-shadow: 0 0 30px #e3e3e3;
    border-radius: 5px;   
    padding:10px 0px
`
const SLessonList = styled(TransitionGroup)`
    width: 100%;
    display: flex;
    flex-direction:column;
    gap: 10px;
`
