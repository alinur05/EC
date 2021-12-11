import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { WHITE } from '../../../../media/colors'

const links = [
    {path: "/about", text: "О нас"},
    {path: "/main", text: "Поиск"},
]

export default function Links() {
    return (
        <SLinks>
            {
                links.map(link => 
                    <Clause key={link.path}>
                        <Link 
                            to={link.path}
                        >
                            {link.text}
                        </Link>   
                    </Clause>
                )
            }
        </SLinks>
    )
}

const SLinks = styled.ul`
    height: 100%;
    display:flex;
    gap: 15px;
    align-items:center;
    margin: 0;
`
const Link = styled(NavLink)`
    color: #000;
    font-size: 20px;

    &:hover {
        color: #000;
        opacity: 0.5;
    }
`
const Clause = styled.li`
    list-style-type:none;

`