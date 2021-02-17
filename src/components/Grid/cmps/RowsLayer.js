import React from 'react'

import Row from './Row'

const RowsLayer = ({
    width,
    height,
    yCells,
    xCells,
    gridViewCenter,
    storyNodes,
}) => {
    const renderRows = () => {
        const rowNums = [...Array(yCells).keys()].map(i => i + 1)
        const rowCenter = Math.ceil(yCells / 2)
        const cellWidth = width / xCells
        const cellHeight = height / yCells
        return rowNums.map(( rowNum ) => {
            const rowGridY = ((rowNum - rowCenter) * -1) + gridViewCenter.y
            const rowNodes = storyNodes.filter(node => node.grid_y === rowGridY)
            return (
                <Row
                    key={rowNum}
                    cellWidth={cellWidth}
                    cellHeight={cellHeight}
                    rowNum={rowNum}
                    xCells={xCells}
                    rowNodes={rowNodes}
                    gridViewCenterX={gridViewCenter.x}
                />
            )
        })
    }

    return (
        <g>
            {renderRows()}
        </g>
    )
}

export default RowsLayer