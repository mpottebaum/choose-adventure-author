import React from "react";

const Arrows = ({
    onGridNavUp,
    onGridNavDown,
    onGridNavLeft,
    onGridNavRight,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="90"
      height="60"
      version="1.1"
    >
      <g display="inline" transform="translate(0 1.372)">
        <g transform="translate(-6.21 -14.31)">
          <g
            transform="translate(7.491 1.258)"
            onClick={onGridNavUp}
          >
            <rect
              width="30"
              height="25"
              x="28.816"
              y="15.094"
              fill="#f2f2f2"
              fillRule="evenodd"
              opacity="0.998"
              paintOrder="fill markers stroke"
              rx="2"
              ry="2"
            ></rect>
            <g
              fill="none"
              stroke="#000"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="1"
              transform="translate(0 2.058)"
            >
              <path d="M33.62 30.189l10.29-10.292"></path>
              <path d="M54.202 30.189L43.911 19.897"></path>
            </g>
          </g>
          <g
            transform="matrix(1 0 0 -1 7.491 84.447)"
            onClick={onGridNavDown}
          >
            <rect
              width="30"
              height="25"
              x="28.816"
              y="15.094"
              fill="#f2f2f2"
              fillRule="evenodd"
              opacity="0.998"
              paintOrder="fill markers stroke"
              rx="2"
              ry="2"
            ></rect>
            <g
              fill="none"
              stroke="#000"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="1"
              transform="translate(0 2.058)"
            >
              <path d="M33.62 30.189l10.29-10.292"></path>
              <path d="M54.202 30.189L43.911 19.897"></path>
            </g>
          </g>
          <g
            transform="matrix(0 -1 -1 0 110.402 98.169)"
            onClick={onGridNavRight}
           >
            <rect
              width="30"
              height="25"
              x="28.816"
              y="15.094"
              fill="#f2f2f2"
              fillRule="evenodd"
              opacity="0.998"
              paintOrder="fill markers stroke"
              rx="2"
              ry="2"
            ></rect>
            <g
              fill="none"
              stroke="#000"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="1"
              transform="translate(0 2.058)"
            >
              <path d="M33.62 30.189l10.29-10.292"></path>
              <path d="M54.202 30.189L43.911 19.897"></path>
            </g>
          </g>
          <g
            transform="rotate(-90 45.191 52.978)"
            onClick={onGridNavLeft}
           >
            <rect
              width="30"
              height="25"
              x="28.816"
              y="15.094"
              fill="#f2f2f2"
              fillRule="evenodd"
              opacity="0.998"
              paintOrder="fill markers stroke"
              rx="2"
              ry="2"
            ></rect>
            <g
              fill="none"
              stroke="#000"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeOpacity="1"
              strokeWidth="1"
              transform="translate(0 2.058)"
            >
              <path d="M33.62 30.189l10.29-10.292"></path>
              <path d="M54.202 30.189L43.911 19.897"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Arrows;