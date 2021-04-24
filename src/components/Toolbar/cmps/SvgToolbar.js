import React from "react"
import { useSelector } from 'react-redux'
import toolbarActions from '../../../constants/toolbarActions'

const { moveAction, drawLineAction } = toolbarActions

const SvgToolbar = ({
    onGridNavUp,
    onGridNavDown,
    onGridNavLeft,
    onGridNavRight,
    onMove,
    onDrawLine,
    height,
    width,
}) => {

    const { toolbarAction } = useSelector(state => state)

    const actionButtonFill = action => {
        if(toolbarAction === action) return 'yellow'
        return '#f2f2f2'
    }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      baseProfile='full'
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMinYMin meet"
    >
      <g id='layer1' transform='translate(0 1.372)'>
        <rect
            x='0'
            y='0'
            fill='#ccc'
            width={width}
            height={height}
        />
      </g>
      <g id='layer2' display='inline' transform='translate(0,1.3722126)'>
        <g id='grid-nav' transform='translate(217.01799,7.0360206)'>
          <g
            onClick={onGridNavUp}
            id='grid-nav-up'
            transform='translate(7.4914214,1.2581434)'>
            <rect
              id='rect895'
              width='30'
              height='25'
              x='28.816465'
              y='15.09434'
              fill='#f2f2f2'
              fillRule='evenodd'
              opacity='0.998'
              paintOrder='fill markers stroke'
              rx='2'
              ry='2'
            ></rect>
            <g
              id='g905'
              fill='none'
              stroke='#000'
              strokeLinecap='butt'
              strokeLinejoin='miter'
              strokeOpacity='1'
              strokeWidth='1'
              transform='translate(0 2.058)'
            >
              <path id='path899' d='M 33.619211,30.188679 43.910806,19.897084'></path>
              <path id='path901' d='M 54.202401,30.188679 43.910806,19.897084'></path>
            </g>
          </g>
          <g
            onClick={onGridNavDown}
            id='grid-nav-down'
            transform='matrix(1,0,0,-1,7.4914239,84.446827)'>
            <rect
              id='rect913'
              width='30'
              height='25'
              x='28.816465'
              y='15.09434'
              fill='#f2f2f2'
              fillRule='evenodd'
              opacity='0.998'
              paintOrder='fill markers stroke'
              rx='2'
              ry='2'
            ></rect>
            <g
              id='g919'
              fill='none'
              stroke='#000'
              strokeLinecap='butt'
              strokeLinejoin='miter'
              strokeOpacity='1'
              strokeWidth='1'
              transform='translate(0,2.058319)'
            >
              <path id='path915' d='M 33.619211,30.188679 43.910806,19.897084'></path>
              <path id='path917' d='M 54.202401,30.188679 43.910806,19.897084'></path>
            </g>
          </g>
          <g
            onClick={onGridNavRight}
            id='grid-nav-right'
            transform='matrix(0,-1,-1,0,110.40223,98.168952)'>
            <rect
              id='rect923'
              width='30'
              height='25'
              x='28.816465'
              y='15.09434'
              fill='#f2f2f2'
              fillRule='evenodd'
              opacity='0.998'
              paintOrder='fill markers stroke'
              rx='2'
              ry='2'
            ></rect>
            <g
              id='g929'
              fill='none'
              stroke='#000'
              strokeLinecap='butt'
              strokeLinejoin='miter'
              strokeOpacity='1'
              strokeWidth='1'
              transform='translate(0,2.058319)'
            >
              <path id='path925' d='M 33.619211,30.188679 43.910806,19.897084'></path>
              <path id='path927' d='M 54.202401,30.188679 43.910806,19.897084'></path>
            </g>
          </g>
          <g
            onClick={onGridNavLeft}
            id='grid-nav-left'
            transform='rotate(-90,45.19125,52.977702)'>
            <rect
              id='rect933'
              width='30'
              height='25'
              x='28.816465'
              y='15.09434'
              fill='#f2f2f2'
              fillRule='evenodd'
              opacity='0.998'
              paintOrder='fill markers stroke'
              rx='2'
              ry='2'
            ></rect>
            <g
              id='g939'
              fill='none'
              stroke='#000'
              strokeLinecap='butt'
              strokeLinejoin='miter'
              strokeOpacity='1'
              strokeWidth='1'
              transform='translate(0,2.058319)'
            >
              <path id='path935' d='M 33.619211,30.188679 43.910806,19.897084'></path>
              <path id='path937' d='M 54.202401,30.188679 43.910806,19.897084'></path>
            </g>
          </g>
        </g>
        <g
            onClick={onMove}
            id='move'
            transform='translate(-427.552 -3.485)'>
          <rect
            id='rect1554'
            width='80'
            height='60'
            x='550.257'
            y='22.985'
            fill={actionButtonFill(moveAction)}
            fillOpacity='1'
            fillRule='evenodd'
            opacity='0.998'
            paintOrder='fill markers stroke'
            rx='2'
            ry='2'
          ></rect>
          <path
            id='rect1556'
            fill='#fff'
            fillOpacity='1'
            fillRule='evenodd'
            stroke='#000'
            strokeOpacity='1'
            d='M572.556 43.225H608.234V61.75H572.556z'
            opacity='0.998'
            paintOrder='fill markers stroke'
          ></path>
          <g
            id='g1604'
            fill='none'
            stroke='#000'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            strokeOpacity='1'
            strokeWidth='1'
          >
            <g
              id='g1578'
              transform='matrix(0 .45084 1.02694 0 529.194 -213.719)'
            >
              <path id='path1574' d='M578.388 34.305l13.036-7.547'></path>
              <path id='path1576' d='M604.46 34.305l-13.036-7.547'></path>
            </g>
            <path id='path1598' d='M556.674 52.92l10.393-.09'></path>
          </g>
          <g
            id='g1614'
            fill='none'
            stroke='#000'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            strokeOpacity='1'
            strokeWidth='1'
            transform='matrix(-1 0 0 1 1180.134 0)'
          >
            <g
              id='g1610'
              transform='matrix(0 .45084 1.02694 0 529.194 -213.719)'
            >
              <path id='path1606' d='M578.388 34.305l13.036-7.547'></path>
              <path id='path1608' d='M604.46 34.305l-13.036-7.547'></path>
            </g>
            <path id='path1612' d='M556.674 52.92l10.393-.09'></path>
          </g>
          <g
            id='g1624'
            fill='none'
            stroke='#000'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            strokeOpacity='1'
            strokeWidth='1'
            transform='matrix(0 1 1 0 538.586 -528.505)'
          >
            <g
              id='g1620'
              transform='matrix(0 .45084 1.02694 0 529.194 -213.719)'
            >
              <path id='path1616' d='M578.388 34.305l13.036-7.547'></path>
              <path id='path1618' d='M604.46 34.305l-13.036-7.547'></path>
            </g>
            <path id='path1622' d='M556.674 52.92l10.393-.09'></path>
          </g>
          <g
            id='g1634'
            fill='none'
            stroke='#000'
            strokeLinecap='butt'
            strokeLinejoin='miter'
            strokeOpacity='1'
            strokeWidth='1'
            transform='rotate(-90 586.107 47.521)'
          >
            <g
              id='g1630'
              transform='matrix(0 .45084 1.02694 0 529.194 -213.719)'
            >
              <path id='path1626' d='M578.388 34.305l13.036-7.547'></path>
              <path id='path1628' d='M604.46 34.305l-13.036-7.547'></path>
            </g>
            <path id='path1632' d='M556.674 52.92l10.393-.09'></path>
          </g>
        </g>
        <g
            onClick={onDrawLine}
            id='draw-line'
            strokeOpacity='1'
            transform='translate(-444.95231,0.970301)'>
            <rect
               id="rect1660"
               width="80"
               height="60"
               x="467.65778"
               y="18.52916"
               rx="2"
               ry="2"
               fill={actionButtonFill(drawLineAction)}
            />
            <path
               d="M 490.97226,58.786443 523.96249,39.380425"
               id="path1666"
                fill='#ff0000'
                stroke='#ff0000'
                strokeWidth='1px'
            />
            <rect
               id="rect1664"
               width="27.909437"
               height="12.384623"
               x="510.25034"
               y="27.608887"
                fill='#ffffff'
                stroke='#000000'
                strokeWidth={0.744138}
            />
            <rect
               id="rect1662"
               width="27.909437"
               height="12.384623"
               x="477.2601"
               y="57.688213"
                fill='#ffffff'
                stroke='#000000'
                strokeWidth={0.744138}
            />
        </g>
      </g>
    </svg>
  );
}

export default SvgToolbar;
