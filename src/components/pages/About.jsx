import React from 'react'
import styled from 'styled-components'
import ContentWrapper from '../../UI/ContentWrapper'
import Flex from '../../UI/Flex'

const About = () => {
    return (
        <SAbout>
            <h1>О нас</h1>
            <p style={{textAlign:"center"}}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam architecto veritatis eius voluptas! Adipisci veritatis fugiat hic odio similique nesciunt consectetur animi cumque facilis sequi a veniam voluptatibus in totam, eum quos enim exercitationem amet? Voluptatem vero dolores provident voluptate odio molestiae, nobis, sequi quisquam a optio aperiam suscipit est nostrum distinctio repellat culpa. Ea totam illo officiis animi! Sint nesciunt maiores nostrum, porro modi quam distinctio. Quaerat necessitatibus doloremque illo suscipit id voluptates officia laudantium corrupti impedit architecto sunt cumque ad deserunt delectus blanditiis ipsa tempore explicabo, tempora accusantium, aliquid error eaque? Deleniti vero itaque, incidunt doloribus nisi, est eos adipisci soluta veniam esse et provident dolor expedita ex? Aliquid, natus veritatis, dolorem atque consequatur quia enim quaerat quos ad deleniti earum nostrum, voluptates sit velit at facilis sed autem tempore ducimus debitis quisquam. Alias temporibus odio atque nam amet, veritatis repellendus porro! Consectetur, blanditiis quod tempore amet asperiores commodi temporibus iste omnis. Excepturi voluptatum iusto quisquam sit cupiditate at iste atque earum iure, necessitatibus deleniti eos libero ipsa? Ipsa nam quibusdam dolor sunt nesciunt saepe natus quo numquam, mollitia cum corporis incidunt modi sit quis consequatur facere minus doloremque repellat labore odit libero. Quis qui illo debitis magnam?
            </p>
        </SAbout>
    )
}

export default About

const SAbout = styled(Flex)`
    width: 100%;
    padding: 50px;
    flex-direction:column;
    align-items:center;
`
