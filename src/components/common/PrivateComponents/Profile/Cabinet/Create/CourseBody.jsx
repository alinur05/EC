import React, { useState } from 'react'
import styled from 'styled-components'
import Flex from '../../../../../../UI/Flex'
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import Error from '../../../../../../UI/Error';

const { Option } = Select;

export default function CourseBody({onClick, fields, setFields}) {
    const categories = useSelector(state => state.category.categories)
    const error = useSelector(state => state.create.error)

    const handleFieldsChangehandler = e => {
        setFields({...fields, [e.target.name]: e.target.value})
    }


    return (
                <SCourseBody>
                    <MyInput 
                        type="text"
                        placeholder="Название курса.."
                        name="courseName"
                        onChange={handleFieldsChangehandler}
                        value={fields.courseName}
                    />
                    <TextArea 
                        maxLength="100"
                        type="text"
                        placeholder="Короткое описание курса.."
                        name="courseShortInfo"
                        onChange={handleFieldsChangehandler}
                        value={fields.courseShortInfo}
                    />
                    
                    <TextArea 
                        maxLength="2000"
                        type="text"
                        placeholder='Информация о курсе..'
                        name="courseInfo"
                        onChange={handleFieldsChangehandler}
                        value={fields.courseInfo}
                    />
                    <Flex width="100%" gap="15px">
                        <MyInput
                            type="email"
                            value={fields.email}
                            name="email"
                            onChange={handleFieldsChangehandler}
                            placeholder="Email (Необязательно)"
                        />
                        <MyInput
                            type="number"
                            value={fields.phoneNumber}
                            name="phoneNumber"
                            onChange={handleFieldsChangehandler}
                            placeholder="Номер телефона (Необязательно)"
                        />
                    </Flex>
                    <Flex width="100%" gap="15px" align="center" justify="space-between" style={{alignSelf: "flex-start"}}>
                        <Flex>
                            <MyInput 
                                style={{width: "150px"}}
                                type="number"
                                placeholder="Цена"
                                name="price"
                                onChange={handleFieldsChangehandler}
                                value={fields.price}
                            />
                            <Currency>сом</Currency>
                        </Flex>
                        <Flex>
                            <Select defaultValue="Категория" style={{ width: 120 }} onChange={value => setFields({...fields, categoryId: value})} >
                                {
                                    categories.map(item => 
                                        <Option value={item.id}>{item.categoryName}</Option>    
                                    )
                                }
                            </Select>
                        </Flex>
                    </Flex>
                    <NextBtn onClick={onClick}>Далее</NextBtn>
                    <Error text={error} height="10px" size="14px" />
                </SCourseBody>
    )
}


const SCourseBody = styled(Flex)`
    width: 100%;
    padding: 10px 0px;
    flex-direction:column;
    align-items:center;
    gap: 15px;
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
const Currency = styled.span`
    font-size: 24px;
`
const TextArea = styled.textarea`
    outline: none;
    width: 100%;
    border: 1px solid #e3e3e3;
    padding: 10px;
    font-size: 20px;

    &:focus {
        border: 1px solid #aeaeae;
    }
`
const MyInput = styled.input`
    width: 100%;
    outline: none;
    border:none;
    border-radius: 5px;
    padding: 5px 8px;
    font-size: 20px;
    border-bottom: 1px solid #e3e3e3;
    &:focus {
        border-bottom: 1px solid #aeaeae;
    }
`