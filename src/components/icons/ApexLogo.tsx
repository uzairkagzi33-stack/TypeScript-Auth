export default function ApexLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_i_apex)">
        <rect width="40" height="40" rx="20" fill="#375DFB" />
        <rect width="40" height="40" rx="20" fill="white" fillOpacity="0.1" />
        <path
          d="M25.5081 16.5684H33.4622C33.952 16.5684 34.2431 17.1157 33.969 17.5215L25.3548 30.2568C25.2411 30.4248 25.0517 30.5254 24.8489 30.5254H13.1184C12.6286 30.5253 12.3381 29.9781 12.6126 29.5723L15.0276 26.001C15.1413 25.8329 15.3316 25.7324 15.5344 25.7324H17.2444C18.3326 25.7324 19.3506 25.1924 19.9602 24.291L25.0012 16.8369C25.1149 16.6689 25.3052 16.5684 25.5081 16.5684Z"
          fill="url(#paint0_linear_apex)" fillOpacity="0.68" stroke="url(#paint1_linear_apex)"
        />
        <g filter="url(#filter1_d_apex)">
          <path
            d="M13.9231 9.86394C14.3366 9.25398 15.0256 8.88867 15.7625 8.88867H26.2805C27.1718 8.88867 27.7003 9.88547 27.2002 10.6233L18.8974 22.8707C18.4839 23.4806 17.795 23.8459 17.058 23.8459H6.54005C5.6487 23.8459 5.12019 22.8491 5.62035 22.1113L13.9231 9.86394Z"
            fill="url(#paint2_linear_apex)" shapeRendering="crispEdges"
          />
          <path
            d="M15.7628 9.38867H26.2804C26.7706 9.38867 27.0613 9.93699 26.7862 10.3428L18.4835 22.5898C18.163 23.0626 17.6288 23.3457 17.0577 23.3457H6.54015C6.04991 23.3457 5.7592 22.7974 6.03429 22.3916L14.337 10.1445C14.6575 9.67183 15.1917 9.38867 15.7628 9.38867Z"
            stroke="url(#paint3_linear_apex)" shapeRendering="crispEdges"
          />
        </g>
      </g>
      <defs>
        <filter id="filter0_i_apex" x="0" y="-4" width="40" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-4" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.64 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_apex" />
        </filter>
        <filter id="filter1_d_apex" x="5.42705" y="8.88867" width="26.4109" height="22.7348" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="2.22222" dy="5.55556" />
          <feGaussianBlur stdDeviation="1.11111" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1344 0 0 0 0 0.268614 0 0 0 0 0.8256 0 0 0 0.32 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_apex" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_apex" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_apex" x1="23.2906" y1="16.0684" x2="23.2906" y2="38.7489" gradientUnits="userSpaceOnUse">
          <stop offset="0.313079" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_apex" x1="66.5882" y1="-20.2347" x2="23.3866" y2="37.2424" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint2_linear_apex" x1="16.4103" y1="8.88867" x2="16.4103" y2="28.6674" gradientUnits="userSpaceOnUse">
          <stop offset="0.38239" stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint3_linear_apex" x1="58.6518" y1="-27.4144" x2="15.1649" y2="29.0311" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}