import React from 'react'
import styled from 'styled-components'
import { fontSizes, colors } from '../../../../constants/theme'

import Header from '../../../Header'

const Container = styled.div`

`


const List = styled.ul`
    list-style-type: none;
`

const Item = styled.li`
    margin: 5px 0px;
`

const Content = styled.p`
    background-color: ${colors.gray};
    border-radius: 4px;
    padding: 5px;
    color: ${colors.white};
`

const { subhead } = fontSizes

const Choices = ({ choices=[] }) => (
    choices.length > 0 && (
        <Container>
            <Header fontSize={subhead}>Choices</Header>
            <List>
                {
                    choices.map(choice => (
                        <Item key={choice.id}>
                            <Content>{choice.content}</Content>
                        </Item>
                    ))
                }
            </List>
        </Container>
    )
)

export default Choices