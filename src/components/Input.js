import styled from 'styled-components'
import { fontSizes } from '../constants/theme'

const Input = styled.input`
    font-size: ${({fontSize}) => fontSize || fontSizes.content}px;
`

export default Input