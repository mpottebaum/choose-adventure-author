import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setGridViewX,
    setGridViewY
} from '../../store/gridViewCenter/actions'

const Toolbar = () => {
    const { gridViewCenter } = useSelector(state => state)
    const dispatch = useDispatch()
    return <div>
        <button onClick={() => dispatch(setGridViewY(gridViewCenter.y + 1))}>^</button>
        <button onClick={() => dispatch(setGridViewY(gridViewCenter.y - 1))}>v</button>
        <button onClick={() => dispatch(setGridViewX(gridViewCenter.x - 1))}>&lt;</button>
        <button onClick={() => dispatch(setGridViewX(gridViewCenter.x + 1))}>&gt;</button>
    </div>
}

export default Toolbar