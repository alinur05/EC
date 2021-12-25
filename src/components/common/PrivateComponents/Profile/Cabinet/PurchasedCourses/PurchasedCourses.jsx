import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../../../UI/Flex'
import UnFound from '../../../../../../UI/UnFound'
import defaultCourseImage from '../../../../../../media/defultCourseImage.png'
import {useHistory} from 'react-router-dom'
import { getImageOnCategory } from '../../../../../../utiles'

export default function PurchasedCourses() {
    const data = useSelector(state => state.session.userData.userPurchasedCourseModels) || []
    const history = useHistory()

    return (
        <SPurchasedCourses>
            <Header>
                <Title>Купленные курсы</Title>
            </Header>
            <List>
                {   
                    data.length ?
                    data.map(item => 
                        <Clause onClick={() => history.push(`/profile/bought-courses/${item.courseModel.id}`)}>    
                            <ClauseImage>
                                <Image 
                                    src={item.imageModel ? item.imageModel.courseImageUrl : getImageOnCategory(item.courseModel.categoryId)}
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
        </SPurchasedCourses>
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
    padding: 20px 10px;
`
const Title = styled.h3`
    font-size: 20px;
    margin: 0;
`
const Header = styled(Flex)`
    width: 100%;
    justify-content:center;
`
const SPurchasedCourses = styled(Flex)`
    width: 50%;
    flex-direction:column;
`