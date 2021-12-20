import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../UI/Flex'
import UnFound from '../../../../UI/UnFound'
import defaultUserAva from '../../../../media/defaultUserAva.png'

export default function CommentBlock() {
    const course = useSelector(state => state.courses.course)


    return (
        <SCommentBlock>
            <CommentTitle>Отзывы</CommentTitle>
            <CommentList>
                {
                        course.comments &&
                        course.comments.length ? 
                        course.comments.map(item => 
                            <Comment>
                                <CommentAvaBlock>
                                    <Img 
                                        src={defaultUserAva}
                                    />
                                </CommentAvaBlock>

                                <span>{item.comment}</span>
                            </Comment>
                        )

                    :

                        <UnFound text="Пока нет отзывов.." size="20px" color="gray" />
                }
            </CommentList>
        </SCommentBlock>
    )
}

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;
    border-radius: 100px;
`
const CommentAvaBlock = styled(Flex)`
    width: 80px;

`
const Comment = styled(Flex)`
    width: 100%;
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 30px #e3e3e3;
    align-items:center;
    gap: 15px;
`
const CommentList = styled(Flex)`
    width: 100%;
    flex-direction:column;
    gap: 15px;
`
const CommentTitle = styled.h2`
    font-size: 36px;
    color: #000;
`
const SCommentBlock = styled(Flex)`
    flex-direction:column;
    width: 100%;
`