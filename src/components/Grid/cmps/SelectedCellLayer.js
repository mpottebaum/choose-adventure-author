import React from 'react'
import { useSelector } from 'react-redux'

const SelectedCellLayer = ({
    cellWidth,
    cellHeight,
    rows,
    columns,
}) => {

    const { selStoryNodeId, storyNodes, newStoryNodeCoordinates } = useSelector(state => state)

    const storyNode = storyNodes.find(node => node.id === selStoryNodeId)

    const selectedCell = storyNode || newStoryNodeCoordinates

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
                        id={`selected-cell`}
                        x={xToSVG(selectedCell.grid_x || selectedCell.x)}
                        y={yToSVG(selectedCell.grid_y || selectedCell.y)}
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