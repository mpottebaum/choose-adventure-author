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

    const selectedCell = storyNode || newStoryNodeCoordinates

    const coordinateToSVG = ( gridCoordinate, svgGridList, svgDimension ) => {
        const svgGridItem = svgGridList.find(svgGridItem => svgGridItem.coordinateNum === gridCoordinate)
        return svgGridItem.svgNum * svgDimension
    }

    return (
        <g>
            {
                selectedCell && (
                    <rect
                        onClick={() => dispatch(openModal(storyNodeModal))}
                        id='selected-cell'
                        x={coordinateToSVG(selectedCell.x, columns, cellWidth)}
                        y={coordinateToSVG(selectedCell.y, rows, cellHeight)}
                        width={cellWidth}
                        height={cellHeight}
                        stroke='green'
                        fill='white'
                        fillOpacity={0}
                        strokeWidth={3}
                    />
                )
            }
        </g>
    )
}

export default SelectedCellLayer