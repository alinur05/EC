import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import ContentWrapper from '../../UI/ContentWrapper'
import PostService from "../../API/API";
import axios from "axios";

export default function ResetPassword() {
    const [values, setValues] = useState({
        encodeEmail: "",
        password: "",
        validPassword:""
    })

    const handleReset = async () => {
        if(values.password !== values.validPassword){
            alert( "пароль не совпадает")
            return
        }

        const resp = await axios.put('https://educhange.herokuapp.com/api/mail/reset-password',{
            encodeEmail:values.encodeEmail,
            password: values.password
        })

        console.log(resp)
    }

    return (
        <ContentWrapper>
            <h1>Reset password</h1>
                <Input placeholder={'key'} onChange={(e)=> setValues({...values, encodeEmail: e.target.value})}></Input>
                <Input.Password onChange={(e)=> setValues({...values, password: e.target.value})} placeholder="Enter new password" />
                <Input.Password
                    onChange={(e)=> setValues({...values, validPassword: e.target.value})}
                    placeholder="Repeat new password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />

            <Button onClick={handleReset}>Reset</Button>
        </ContentWrapper>
    )
}
