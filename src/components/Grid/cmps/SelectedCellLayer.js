import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { openModal } from '../../../store/modal/actions'
import { storyNodeModal } from '../../../constants/modals'

const SelectedCellLayer = ({
    cellWidth,
    cellHeight,
    rows,
    columns,
}) => {

    const { selStoryNodeId, storyNodes, newStoryNodeCoordinates } = useSelector(state => state)
    const storyNode = storyNodes.find(node => node.id === selStoryNodeId)

    const dispatch = useDispatch()

    let selectedCell = null
    if(storyNode) {
        selectedCell = {
            x: storyNode.grid_x,
            y: storyNode.grid_y,
        }
    } else if(newStoryNodeCoordinates) {
        selectedCell = newStoryNodeCoordinates
    }
    
    const xToSVG = gridX => {
        const column = columns.find(column => column.coordinateNum === gridX)
        return column.colNum * cellWidth
    }
    
    const yToSVG = gridY => {
        const row = rows.find(row => row.coordinateNum === gridY)
        return row.rowNum * cellHeight
    }

    return (
        <g>
            {
                selectedCell && (
                    <rect
                        onClick={() => dispatch(openModal(storyNodeModal))}
                        id={`selected-cell`}
                        x={xToSVG(selectedCell.x)}
                        y={yToSVG(selectedCell.y)}
                        width={cellWidth}
                        height={cellHeight}
                        stroke={'green'}
                        fill={'white'}
                        fillOpacity={0}
                        strokeWidth={3}
                    />
                )
            }
        </g>
    )
}

export default SelectedCellLayer