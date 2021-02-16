import React from 'react'

import Row from './cmps/Row'

const Grid = ({
    storyNodes,
    gridViewCenter,
    width,
    height,
    xCells,
    yCells,
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

    return <svg
        version="1.1"
        baseProfile="full"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin meet"
    >
        <g>
            {renderRows()}
        </g>
    </svg>
}

export default Grid