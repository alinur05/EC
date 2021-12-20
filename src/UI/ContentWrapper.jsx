import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'

export default function ContentWrapper({children, props}) {
    return (
        <SContentWrapper {...props}>
            {children}
        </SContentWrapper>
    )
}


const SContentWrapper = styled(Flex)`
    width: 100%;
    padding: ${({padding}) => padding || "30px 50px"};
    flex-direction:column;
    flex-wrap:wrap;
`