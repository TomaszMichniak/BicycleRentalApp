
const EmailIcon = ({ className = '' }) => (

  <svg
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
   className={`fill-none stroke-current ${className}`}
  >
    <polyline
      points="47 16 47 47 1 47 1 16"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="46 17 24 31 2 17"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="24"
      y1="1"
      x2="1"
      y2="16"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="24"
      y1="1"
      x2="47"
      y2="16"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EmailIcon;
