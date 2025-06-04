const CalendarCheckIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={`fill-none stroke-current ${className}`}
  >
    <polyline
      strokeWidth="2"
      strokeLinejoin="bevel"
      strokeMiterlimit="10"
      points="23,36 30,43 43,30"
    />
    <g>
      <line
        strokeWidth="2"
        strokeMiterlimit="10"
        x1="46"
        y1="10"
        x2="18"
        y2="10"
      />
      <polyline
        strokeWidth="2"
        strokeMiterlimit="10"
        points="12,10 1,10 1,58 63,58 63,10 52,10"
      />
      <rect
        x="12"
        y="6"
        width="6"
        height="8"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <rect
        x="46"
        y="6"
        width="6"
        height="8"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </g>
    <line
      strokeWidth="2"
      strokeMiterlimit="10"
      x1="1"
      y1="18"
      x2="63"
      y2="18"
    />
  </svg>
);

export default CalendarCheckIcon;