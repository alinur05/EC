import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../UI/Flex'
import UnFound from '../../../../UI/UnFound'
import defaultUserAva from '../../../../media/defaultUserAva.png'
import { Button, Input } from 'antd'
import {commentCourse} from '../../../../redux/actions/actions'
import { getLocalStorage } from '../../../../utiles'
import { DARK_BLACK } from '../../../../media/colors'


export default function CommentBlock() {
    const course = useSelector(state => state.courses.course)
    const [comment, setComment] = useState("")
    const dispatch = useDispatch()
    const session = getLocalStorage("session")

    const handleComment = () => {
        dispatch(commentCourse({comment, courseId: course.courseModel.id}, session.token))
        setComment("")
    }   

    return (
        <SCommentBlock>
            <CommentTitle>Комментарии</CommentTitle>
            {
                session ?
                    <CommentingBlock>
                        <CommentField
                            value={comment}
                            onChange={e => setComment(e.target.value)} 
                            placeholder="Комментарии.."
                        />
                        <Button onClick={handleComment}>Отправить</Button>
                    </CommentingBlock>
                :
                    <WarnBlock>
                        <WarnText>Только авторизованные пользователи могут оставить комментарии</WarnText>
                    </WarnBlock>
            }

            <CommentList>
                {
                        course.comments &&
                        course.comments.length ? 
                        course.comments.map(item => 
                            <Comment>
                                <CommentAvaBlock>
                                    <Img 
                                        src={item.userImageUrl ? item.userImageUrl:defaultUserAva}
                                    />
                                </CommentAvaBlock>
                                <CommentBody>
                                    <UserName>@{item.username}</UserName>
                                    <span>{item.comment}</span>
                                </CommentBody>
                            </Comment>
                        )

                    :

                        <UnFound text="Пока нет комментариев.." size="20px" color="gray" />
                }
            </CommentList>
        </SCommentBlock>
    )
}

const WarnText = styled.h3`
    margin: 0;
    font-size: 16px;
    color: ${DARK_BLACK};

`
const WarnBlock = styled(Flex)`
    width: 100%;
    height: 50px;
    border: 1px solid ${DARK_BLACK};
    align-items:center;
    justify-content:center;
`
const CommentField = styled.textarea`
    outline: none;
    border: 1px solid #e3e3e3;
    border-radius: 5px;
    cursor:pointer;
    padding: 10px;
    width: 300px;
    height: 80px;
    &:hover {
        border: 1px solid ${DARK_BLACK};
    }
`
const UserName = styled.h3`
    font-size: 16px;
    color: gray;
    margin: 0;
`
const CommentBody = styled(Flex)`
    flex-direction:column;
`
const CommentingBlock = styled(Flex)`
    flex-direction:column;
    gap: 10px;
`
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
    margin: 0;
    color: #000;
`
const SCommentBlock = styled(Flex)`
    flex-direction:column;
    width: 100%;
    gap: 20px;
`