import { Button, Input } from 'antd'
import React, { useState } from 'react'
import ContentWrapper from '../../UI/ContentWrapper'

export default function ResetPassword() {
    const [value, setValue] = useState("")

    const handleReset = () => {
        console.log(value)
    }

    return (
        <ContentWrapper>
            <h1>Reset password</h1>
            <Input placeholder="key" value={value} onChnage={e => setValue(e.target.value)} />
            <Button onClick={handleReset}>Reset</Button>
        </ContentWrapper>
    )
}
