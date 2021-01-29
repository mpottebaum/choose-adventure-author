import React from 'react'
import styled from 'styled-components'

import Row from './cmps/Row'

const Container = styled.div`

`

const Grid = () => {

    return <Container>
        {
            cells.map(row => (
                <Row cells={row} />
            ))
        }
    </Container>
}

export default Grid


const cells = [
    [ { name: '1A' }, { name: '1B' }, { name: '1C' }, { name: '1D' }, { name: '1E' }, ],
    [ { name: '2A' }, { name: '2B' }, { name: '2C' }, { name: '2D' }, { name: '2E' }, ],
    [ { name: '3A' }, { name: '3B' }, { name: '3C' }, { name: '3D' }, { name: '3E' }, ],
    [ { name: '4A' }, { name: '4B' }, { name: '4C' }, { name: '4D' }, { name: '4E' }, ],
    [ { name: '5A' }, { name: '5B' }, { name: '5C' }, { name: '5D' }, { name: '5E' }, ],
]