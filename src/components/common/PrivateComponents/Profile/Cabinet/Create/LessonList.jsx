import { DeleteOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
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

export default function LessonList({data}) {
    const dispatch = useDispatch()


    return (
        <SLessonList>
            {
                data.map((lesson, index) => 
                <Card
                    key={index}
                    timeout={500}
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
                                <RemoveBtn onClick={() => dispatch(removeLesson(lesson.id))}>
                                    <DeleteOutlined />
                                </RemoveBtn>
                            </AdjustBlock>
                        </Body>
                    </Lesson>
                </Card>
                )
            }
        </SLessonList>
    )
}


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
