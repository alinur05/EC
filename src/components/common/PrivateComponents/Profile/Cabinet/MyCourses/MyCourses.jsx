import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../../../UI/Flex'
import UnFound from '../../../../../../UI/UnFound'
import defaultCourseImage from '../../../../../../media/defultCourseImage.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function MyCourses() {
    const data = useSelector(state => state.session.userData.userCreateCourseModels) 
    const history = useHistory()

    return (
        <SMyCourses>
            <Header>
                <Title>Мои курсы</Title>
                <NewCourseBtn onClick={() => history.push("/profile/create")}>+</NewCourseBtn>
            </Header>
            <List>
                {   
                    data.length ?
                    data.map(item => 
                        <Clause>    
                            <ClauseImage>
                                <Image 
                                    src={item.imageModel ? item.imageModel.imageUrl : defaultCourseImage}
                                /> 
                            </ClauseImage>
                            <ClauseBody>
                                <CourseName>{item.courseModel.courseName}</CourseName>
                                <Cost>{item.courseModel.price} сом</Cost>
                            </ClauseBody>
                        </Clause>    
                    )
                    :
                        <UnFound text="Пусто" size="14px" color="gray"/>
                }
            </List>
        </SMyCourses>
    )
}

const Cost = styled.span`
    font-size: 14px;
    align-self:flex-end;
`
const CourseName = styled.h3`
    font-weight: bold;
    font-size: 14px;
    line-height: 15px;
    margin: 0;
`
const ClauseBody = styled(Flex)`
    width: 70%;
    padding: 3px 8px;
    flex-direction:column;
    height: 100%;
    justify-content:space-between;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;
`
const ClauseImage = styled(Flex)`
    width: 30%;
    height: 100%;
`
const Clause = styled(Flex)`
    width: 100%;
    box-shadow: 0 0 30px #e3e3e3;
    height: 60px;
    cursor:pointer;
`
const List = styled.ul`
    width: 100%;
    display:flex;
    flex-direction:column;
    gap: 15px;
    padding: 15px 10px;
`
const NewCourseBtn = styled.button`
    background: none;
    border: 1px solid #e3e3e3;
    font-size: 16px;
    padding: 5px 10px;
    cursor:pointer;
    border-radius: 1px solid #e3e3e3;
`
const Title = styled.h3`
    margin: 0;
    font-size: 20px;
`
const Header = styled(Flex)`
    width: 100%;
    justify-content:space-between;
`
const SMyCourses = styled(Flex)`
    width: 50%;
    flex-direction:column;
`
