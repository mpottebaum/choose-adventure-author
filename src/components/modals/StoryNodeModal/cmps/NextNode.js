import React from 'react'
import styled from 'styled-components'
import { fontSizes } from '../../../../constants/theme'

import Header from '../../../Header'

const Container = styled.div`

`

const Name = styled.p`

`

const { subhead } = fontSizes

const NextNode = ({ storyNode=null }) => (
    storyNode && (
    <Container>
        <Header fontSize={subhead}>Next Story Node</Header>
        <Name>{storyNode.name}</Name>
    </Container>
    )
)

export default NextNode