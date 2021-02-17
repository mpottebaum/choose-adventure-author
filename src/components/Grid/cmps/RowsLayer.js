import React from 'react'

import Row from './Row'

const RowsLayer = ({
    cellWidth,
    cellHeight,
    rows,
    columns,
    storyNodes,
}) => {
    const renderRows = () => {
        return rows.map(( row ) => {
            const rowNodes = storyNodes.filter(node => node.grid_y === row.coordinateNum)
            return (
                <Row
                    key={row.rowNum}
                    cellWidth={cellWidth}
                    cellHeight={cellHeight}
                    row={row}
                    columns={columns}
                    rowNodes={rowNodes}
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