import React from 'react'
import styled from 'styled-components'
import { Menu, Dropdown } from 'antd';

export default function SearchCategory() {

    const menu = (
        <Menu>
          <Menu.Item>
              Item
          </Menu.Item>
        </Menu>
      )

    return (
        <Dropdown overlay={menu}>
            <SSearchCategory>
                Категории
            </SSearchCategory>
        </Dropdown>
    )
}

const SSearchCategory = styled.h3`
    margin: 0;
    font-size: 18px;
    cursor: pointer;
`