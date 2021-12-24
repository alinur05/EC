import { EditOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons'
import React, {useState} from 'react'
import styled from 'styled-components'
import { DARK_BLACK, RED} from '../../../../../../../media/colors'
import Flex from '../../../../../../../UI/Flex'
import { Modal } from 'antd';
import { isGoodUrl } from '../../../../../../../utiles'
import defaultLesson from '../../../../../../../media/play-button.png'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import Error from '../../../../../../../UI/Error'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { saveLesson, removeMyCourseLesson } from '../../../../../../../redux/actions/actions'
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

export default function Item({item}) {
    const dispatch = useDispatch()

    const [error, setError] = useState('')
    const [fields, setFields] = useState({
        lessonUrl: item.lessonUrl,
        lessonInfo: item.lessonInfo,
        id: item.id,
        isVisible: item.isVisible
    })

    const handleFieldsChanging = e => {
        setFields({...fields, [e.target.name]:e.target.value})
    }

    const [visible, setVisible] = useState(false)

    const handleModalCancel = () => {
        setVisible(false)
        setError('')
    }

    const handleSave = () => {
        if(fields.lessonInfo && fields.lessonUrl) {
            dispatch(saveLesson(fields))
            handleModalCancel()
        }else {
            setError("Заполните все поля!")
        }
    }

    const handleRemoveLesson = () => {
        dispatch(removeMyCourseLesson(item.id))
        handleModalCancel()
    }

    return (
    <Card>    
        <ClausesWrapper>
            <ClauseName>Url урока</ClauseName>
            <Clause
                value={item.lessonUrl}
            />
        </ClausesWrapper>
        <ClausesWrapper>
            <ClauseName>Описание урока</ClauseName>
            <Clause
                value={item.lessonInfo}
            />
        </ClausesWrapper>
        <ClausesWrapper>
            <ClauseName>Приватность</ClauseName>
            <span>
                {item.isVisible ? <EyeOutlined style={{fontSize: "16px", color: "gray"}}/>: <LockOutlined style={{fontSize: "16px", color: "gray"}}/>}
            </span>
        </ClausesWrapper>
        <EditBtn onClick={() => setVisible(true)}> 
            <EditOutlined />
        </EditBtn>
            <Modal
                header={false}
                footer={false}
                visible={visible} 
                onCancel={handleModalCancel}
            >
                <EditContent>
                    <Section align="center" >
                            {
                                isGoodUrl(fields.lessonUrl) ?
                                    <Video>
                                        <iframe width="100%" height="100%" src={fields.lessonUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </Video>

                                :
                                    <DefaultWrapper>
                                        <Img 
                                            src={defaultLesson}
                                            alt="default"
                                        />
                                    </DefaultWrapper>
                            }

                        <Flex direction='column' width="60%">
                            <Title>Url урока</Title>
                            <Field 
                                placeholder='url'
                                value={fields.lessonUrl}
                                name="lessonUrl"
                                onChange={handleFieldsChanging}
                            />
                        </Flex> 
                    </Section>
                    <Section direction="column" gap="0px"> 
                        <Title>Описание урока</Title>
                        <TextArea 
                            placeholder='Описание урока'
                            name="lessonInfo"
                            value={fields.lessonInfo}
                            onChange={handleFieldsChanging}
                        />
                    </Section>
                    <Section>
                        <Checkbox checked={fields.isVisible} onChange={e => setFields({...fields, isVisible: e.target.checked})}>
                            Показывать бесплатно
                        </Checkbox>
                    </Section>
                    <Error text={error} height="auto" size="16px"/>
                    <Section justify="flex-end">
                        <RemoveBtn onClick={handleRemoveLesson}>Удалить</RemoveBtn>
                        <SaveBtn onClick={handleSave}>Cохранить</SaveBtn>
                    </Section>
                </EditContent>
            </Modal>
    </Card>    
    )
}

const SaveBtn = styled.button`
    padding: 3px 13px;
    border: 1px solid #e3e3e3;
    background: none;
    border-radius: 5px;
    font-size: 14px;
    color: #252525;
    align-self:flex-end;
    cursor:pointer;
    &:hover {
        border: 1px solid ${DARK_BLACK};
        color: #000;
    }
`
const RemoveBtn = styled(SaveBtn)`
    background: ${RED};
    border: 1px solid ${RED};
    color: #fff;
    &:hover {
        border: 1px solid ${RED};
        color: #fff;
    }
`
const TextArea = styled.textarea`
    font-size: 14px;
    border:1px solid #e3e3e3;
    padding: 10px;
    border-radius: 5px;
    width: 100%;
    height: 80px;
    outline: none;
    &:hover {
        border:1px solid ${DARK_BLACK};
    }
`
const Field = styled.input`
    width:100%;
    padding: 3px 8px; 
    border: none;
    border-bottom: 1px solid #e3e3e3;
    border-radius: 5px;
    outline: none;
    cursor:pointer;
    &:hover {
        border-bottom: 1px solid ${DARK_BLACK};
    }
`
const Title = styled.h3`
    font-size: 14px;
    font-weight: bold;
    margin: 0;
`
const Video = styled(Flex)`
    width: 40%;
    height: 100px;
`
const DefaultWrapper = styled(Flex)`
    border-radius: 100px;
    width: 30%;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;
`
const Section = styled(Flex)`
    width: 100%;
    gap: 15px;
`
const EditContent = styled(Flex)`
    flex-direction:column;
    gap: 10px;
`
const EditBtn = styled.button`
    font-size: 22px;
    color: gray;
    background: none;
    cursor:pointer;
    border: none;
    &:hover {
        color: ${DARK_BLACK}
    }
`
const ClausesWrapper = styled(Flex)`
    flex-direction:column;
    align-items:center;
`
const Clause = styled.input`
    font-size: 16px;
    color: #000;
    border: none;
    border-radius: 5px;
    border-bottom: 1px solid #e3e3e3;
    outline: none;
    width: 100px;
    &:focus {
        border-bottom: 1px solid ${DARK_BLACK}
    }

`
const ClauseName = styled.h3`
    margin: 0;
    color: gray;
    font-size: 14px;
`
const Card = styled(Flex)`
    display:flex;
    width: 100%;
    height: 60px;
    align-items:center;
    justify-content:space-between;
    border-radius: 5px;
    padding: 0px 30px;
    background: #fff;
    box-shadow: 0 0 30px #e3e3e3;
`



const SLessonList = styled(TransitionGroup)`
    width: 100%;
    display: flex;
    flex-direction:column;
    gap: 10px;
`
