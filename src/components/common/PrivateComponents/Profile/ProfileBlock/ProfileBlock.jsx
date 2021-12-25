import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Flex from '../../../../../UI/Flex'
import defaultUserAva from '../../../../../media/defaultUserAva.png'
import { useSelector } from 'react-redux'
import ContentBlock from './ContentBlock'
import { useDispatch } from 'react-redux'
import { getLocalStorage } from '../../../../../utiles'
import { updateUserAva } from '../../../../../redux/actions/actions'
import { DownloadOutlined } from '@ant-design/icons'

export default function ProfileBlock() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.session.userData)

    const [file, setFile] = useState(null)

    const handleUpdate = () => {
        const formData = new FormData()
        formData.append("file", file)

        const body = {
            type: userData.userImageModel ? "update":"create",
            data: formData
        }
        dispatch(updateUserAva(body))
    }

    return (
        <SProfileBlock>
            <AvaBlock>
                <AvaWrapperBlock>
                    <Ava 
                        src={userData.userImageModel ? userData.userImageModel.userImageUrl : defaultUserAva}
                    />
                    <UploadField htmlFor={"ava"}>
                        <DownloadOutlined style={{fontSize: "24px"}} />
                        <span style={{fontSize: "20px"}}>Загрузить</span>
                    </UploadField>
                </AvaWrapperBlock>
                <input 
                    type="file"
                    style={{display:"none"}}
                    onChange={e => setFile(e.target.files[0])}
                    id="ava"
                />
                <ChangeAvaBtn disable={file} onClick={handleUpdate}>
                    Изменить
                </ChangeAvaBtn>
            </AvaBlock>
            <ContentBlock />
        </SProfileBlock>
    )
}

const UploadField = styled.label`
    position:absolute;
    top: 50px;
    left: 30px;
    display:flex;
    flex-direction:column;
    cursor:pointer;
    &:hover {
        opacity: 0.6
    }
`
const ChangeAvaBtn = styled.label`
    width: 150px;
    text-align:center;
    padding: 5px 0px;
    border: 1px solid #EFECEA;
    border-radius: 5px;
    background: #fff;
    font-size: 16px;
    cursor:pointer;
    ${props => props.disable && css`
        pointer-events: none
    `}
    &:hover {
        opacity: 0.6;
    }
`
const Ava = styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;
    border-radius: 100px;
`
const AvaWrapperBlock = styled.div`
position:relative;
    width: 150px;
    gap: 15px;
`
const AvaBlock = styled(Flex)`
    flex-direction:column;
    gap: 15px;
    align-items:center;
`
const SProfileBlock = styled(Flex)`

`