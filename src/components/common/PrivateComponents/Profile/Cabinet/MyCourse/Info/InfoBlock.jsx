import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../../../../UI/Flex'
import defualtCourseImage from '../../../../../../../media/defultCourseImage.png'
import {DARK_BLACK, RED, YELLOW} from '../../../../../../../media/colors'
import { CommentOutlined, LikeOutlined, PlayCircleOutlined, WarningFilled, WarningOutlined, DownloadOutlined } from '@ant-design/icons'
import { Modal, Select } from 'antd';
import Loader from '../../../../../../../UI/Loader'
import { removeCourse, setAuthError, setMyCourseError, updateCourse } from '../../../../../../../redux/actions/actions'
import { checkEmail, checkNumber } from '../../../../../../../utiles'
import Error from '../../../../../../../UI/Error'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const { Option } = Select;

export default function InfoBlock({data}) {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.category.categories)
    const isLoading = useSelector(state => state.myCourse.loading)
    const error = useSelector(state => state.myCourse.error)
    const history = useHistory()

    const [fields, setFields] = useState({
        categoryId: data.courseModel && data.courseModel.categoryId,
        courseName: data.courseModel && data.courseModel.courseName,
        email: data.courseModel && data.courseModel.email,
        phoneNumber:data.courseModel && data.courseModel.phoneNumber,
        courseShortInfo: data.courseModel && data.courseModel.courseShortInfo,
        courseInfo: data.courseModel && data.courseModel.courseInfo,
        price:data.courseModel && data.courseModel.price
    })
    const [file, setFile] = useState(null)

    const handleFieldChanging = e => {
        setFields({...fields, [e.target.name]:e.target.value})
    }

    const handleSaveBtn = () => {
        const email = checkEmail(fields.email)
        const num = checkNumber(fields.phoneNumber)

        if(!email) dispatch(setMyCourseError("???????????????????????? ???????????? email"))
        if(!num) dispatch(setMyCourseError("???????????????????????? ???????????? ????????????"))

        const formData = new FormData()
        formData.append("file", file)
        if(email && num) {
            const body = {
                fields: {...fields, id: data.courseModel.id},
                file: {
                    type: data.imageModel ? "update":"create",
                    id: data.imageModel ? data.imageModel.id: data.courseModel.id,
                    data: formData
                },
    
            }
            dispatch(updateCourse(body))
            dispatch(setMyCourseError(''))
        }
    }

    const [removeModalVisible, setRemoveModalVisible] = useState(false)

    const handleCloseModal = () => {
        setRemoveModalVisible(false)
    }

    const handleRemoveCourse = () => {
        dispatch(removeCourse(data.courseModel.id))
        handleCloseModal()
        history.push("/profile")
    }

    return (
        <SInfoBlock>
            <Header>
                <Title>???????????? ??????????</Title>
            </Header>
            <InfoBody>
                <FirstSection>
                    <ImageBlock>
                        <Img 
                            src={data.imageModel ? data.imageModel.courseImageUrl : file }
                            alt="courseImg"
                        />
                        <UpdateImgBlock>
                            <input type="file" id='courseImage' style={{display: 'none'}} onChange={e => setFile(e.target.files[0])}/>
                            <DownloadOutlined style={{fontSize: "48px"}}/>
                            <LoadBtn htmlFor="courseImage">??????????????????</LoadBtn>
                        </UpdateImgBlock>
                        <Flex gap="10px">
                            <Flex gap="5px" align="center">
                                <Likes>{data.likes && data.likes.length}</Likes>
                                <LikeOutlined style={{fontSize: "16px", color: "gray"}}/>
                            </Flex> 
                            <Flex gap="5px" align="center">
                                <Comments>{data.comments && data.comments.length}</Comments>
                                <CommentOutlined style={{fontSize: "16px", color: "gray"}}/>
                            </Flex> 
                            <Flex gap="5px" align="center">
                                <Comments>{data.lessonCount}</Comments>
                                <PlayCircleOutlined style={{fontSize: "16px", color: "gray"}} />
                            </Flex> 
                        </Flex>
                    </ImageBlock>
                    <ContentBlock>
                        <Flex width="100%" direction="column">
                            <ClauseName>???????????????? ??????????</ClauseName>
                            <Field
                                name="courseName"
                                value={fields.courseName}
                                onChange={handleFieldChanging}
                            />
                        </Flex>
                        <Flex width="100%" direction="column">
                            <ClauseName>Email</ClauseName>
                            <Field
                                name="email"
                                value={fields.email}
                                onChange={handleFieldChanging}
                            />
                        </Flex>
                        <Flex width="100%" direction="column">
                            <ClauseName>?????????? ????????????????</ClauseName>
                            <Field
                                name="phoneNumber"
                                value={fields.phoneNumber}
                                onChange={handleFieldChanging}
                            />
                        </Flex>
                    </ContentBlock>
                </FirstSection>
                <SecondSection>
                    <Flex direction="column" width="100%">
                        <ClauseName>???????????????? ???????????????? ??????????</ClauseName>
                        <TextArea 
                            name="courseShortInfo"
                            value={fields.courseShortInfo}
                            onChange={handleFieldChanging}
                        />
                    </Flex>
                    <Flex direction="column" width="100%">
                        <ClauseName>???????????????? ??????????</ClauseName>
                        <TextArea 
                            name="courseInfo"
                            value={fields.courseInfo}
                            onChange={handleFieldChanging}
                        />
                    </Flex>
                </SecondSection>
                <Footer>
                    <Flex gap="10px">
                        <Price>????????</Price>
                        <PriceField
                            value={fields.price}
                            name="price"
                            onChange={handleFieldChanging}
                        />
                        <span style={{fontSize: "24px"}}> ??????</span>
                    </Flex>
                    <Select defaultValue={fields.categoryId} style={{ width: 120 }} onChange={value => setFields({...fields, categoryId: value})} >
                    {
                        categories.map(item => 
                            <Option value={item.id}>{item.categoryName}</Option>    
                        )
                    }
                    </Select>
                </Footer>
                <Flex width="100%" justify="flex-end" align='center' gap="15px">
                    <RemoveBtn onClick={() => setRemoveModalVisible(true)}>??????????????</RemoveBtn>
                    <Modal
                        footer={false}
                        header={false}
                        visible={removeModalVisible}
                        onCancel={handleCloseModal}
                    >
                        <Flex direction="column" align="center" gap="15px">
                            <WarningOutlined style={{fontSize: "32px", color: YELLOW}}/>
                            <span>???? ???????????????</span>
                            <Flex gap="8px">
                                <CancelBtn onClick={handleCloseModal}>????????????</CancelBtn>
                                <RemoveBtn onClick={handleRemoveCourse}>??????????????</RemoveBtn>
                            </Flex>
                        </Flex>
                    </Modal>
                    {
                        isLoading ?
                            <Loader width="auto" height="auto" size="24px" />
                        :
                            <SaveBtn onClick={handleSaveBtn}>??????????????????</SaveBtn>
                    }
                </Flex>
                <Error text={error} height="auto" size="16px" />
            </InfoBody>
        </SInfoBlock>
    )
}

const LoadBtn = styled.label`
    font-size: 32px;
    &:hover {
        color:gray;
    }
`
const UpdateImgBlock = styled(Flex)`
    position: absolute;
    top: 60px;
    left: 60px;
    flex-direction:column;
    cursor:pointer;
    align-items:center;
`
const SaveBtn = styled.button`
    border-radius: 5px;
    border: 1px solid #e3e3e3;
    padding: 5px 13px;
    background: none;
    color: #252525;
    cursor:pointer;
    &:hover {
        border: 1px solid ${DARK_BLACK};
        color: #000
    }
`
const CancelBtn = styled(SaveBtn)`

`
const RemoveBtn = styled.button`
    border-radius: 5px;
    border: 1px solid ${RED};
    padding: 5px 13px;
    background: none;
    color: #FFF;
    cursor:pointer;
    background: ${RED};
    &:hover {
        border: 1px solid #a60013;
        background: #a60013
    }
`
const Field = styled.input`
    width: 100%;
    font-size: 14px;
    border-radius: 5px;
    border: none;
    border-bottom: 1px solid #e3e3e3;
    padding: 5px 13px;
    outline: none;
    &:hover {
        border-bottom: 1px solid ${DARK_BLACK};
    }
`
const PriceField = styled(Field)`
    font-size: 24px;
    width: 100px;
`
const Price = styled.h3`
    margin: 0;
    font-size: 24px;

`
const Footer = styled(Flex)`
    width: 100%;
    justify-content:space-between;
    align-items:center;
`
const SecondSection = styled(Flex)`
    width: 100%;
    flex-direction: column;
`
const Comments = styled.span`
    font-size: 16px;
    color: gray;
`
const Likes = styled.span`
    font-size: 16px;
    color: gray;
`
const TextArea = styled.textarea`
    outline: none;
    width: 100%;
    border: 1px solid #e3e3e3;
    padding: 10px;
    font-size: 20px;

    &:hover {
        border: 1px solid #aeaeae;
    }
`

const ClauseName = styled.h3`
    margin: 0;
`
const ContentBlock = styled(Flex)`
    width: 50%;
    padding-left: 15px;
    flex-direction:column;
    gap: 10px;
`
const Img = styled.img`
    width: 100%;
    height: 220px;
    object-fit:cover;
    border-radiusS: 100%;
`
const ImageBlock = styled(Flex)`
    width: 50%;
    flex-direction:column;
    gap: 10px;
    position:relative;
`
const FirstSection = styled(Flex)`
    width: 100%;
`
const InfoBody = styled(Flex)`
    width: 100%;
    padding: 10px 30px;
    flex-direction:column;
    gap: 10px;
`
const Title = styled.h2`
    margin: 0;
    font-size: 24px
`
const Header = styled(Flex)`
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #e3e3e3;
    align-items:center;
    padding: 0px 30px;
`
const SInfoBlock = styled(Flex)`
    width: 100%;
    box-shadow: 0 0 30px #e3e3e3;
    flex-direction:column;
`