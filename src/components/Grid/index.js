import React from 'react'
import { useSelector } from 'react-redux'

import RowsLayer from './cmps/RowsLayer'
import LinesLayer from './cmps/LinesLayer'
import SelectedCellLayer from './cmps/SelectedCellLayer'

const Grid = ({
    width,
    height,
    numCols,
    numRows,
}) => {

    const gridViewCenter = useSelector(state => state.gridViewCenter)

    const createSvgGridLists = (numSvgNums, gvcCoordinate, isRows) => {
        const svgNums = [...Array(numSvgNums).keys()].map(i => i)
        const centerSvgNum = Math.floor(numSvgNums / 2)
        return svgNums.map(svgNum => ({
            svgNum,
            coordinateNum: ((svgNum - centerSvgNum) * (isRows ? -1 : 1)) + gvcCoordinate
        })) 
    }

    const cellHeight = height / numRows
    const cellWidth = width / numCols
    const rows = createSvgGridLists(numRows, gridViewCenter.y, true)
    const columns = createSvgGridLists(numCols, gridViewCenter.x)

    return <svg
        version="1.1"
        baseProfile="full"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMinYMin meet"
    >
        <LinesLayer
            cellHeight={cellHeight}
            cellWidth={cellWidth}
            rows={rows}
            columns={columns}
        />
        <RowsLayer
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            rows={rows}
            columns={columns}
        />
        <SelectedCellLayer
            cellWidth={cellWidth}
            cellHeight={cellHeight}
            rows={rows}
            columns={columns}
        />
    </svg>
}

export default Grid