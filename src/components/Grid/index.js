import React from 'react'

import RowsLayer from './cmps/RowsLayer'

const Grid = ({
    storyNodes,
    gridViewCenter,
    width,
    height,
    xCells,
    yCells,
}) => {

    return <svg
        version="1.1"
        baseProfile="full"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin meet"
    >
        <RowsLayer
            width={width}
            height={height}
            yCells={yCells}
            xCells={xCells}
            gridViewCenter={gridViewCenter}
            storyNodes={storyNodes}
        />
    </svg>
}

export default Grid