export default function CustomIcon() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="87" height="87" rx="43.5" fill="url(#paint0_linear_ci)" />
      <rect x="0.5" y="0.5" width="87" height="87" rx="43.5" stroke="url(#paint1_linear_ci)" />
      <g filter="url(#filter0_d_ci)">
        <rect x="16" y="16" width="56" height="56" rx="28" fill="white" />
        <rect x="16.5" y="16.5" width="55" height="55" rx="27.5" stroke="#E5E7EB" />
        <path
          d="M35.6 54.5002C35.6 52.2724 36.485 50.1358 38.0603 48.5605C39.6356 46.9852 41.7722 46.1002 44 46.1002C46.2278 46.1002 48.3644 46.9852 49.9397 48.5605C51.515 50.1358 52.4 52.2724 52.4 54.5002H35.6ZM44 45.0502C40.5192 45.0502 37.7 42.2309 37.7 38.7502C37.7 35.2694 40.5192 32.4502 44 32.4502C47.4807 32.4502 50.3 35.2694 50.3 38.7502C50.3 42.2309 47.4807 45.0502 44 45.0502Z"
          fill="#4B5563"
        />
      </g>
      <defs>
        <filter id="filter0_d_ci" x="15" y="16" width="58" height="58" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_ci" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_ci" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_ci" x1="44" y1="0" x2="44" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E4E5E7" stopOpacity="0.48" />
          <stop offset="1" stopColor="#F7F8F8" stopOpacity="0" />
          <stop offset="1" stopColor="#E4E5E7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_ci" x1="44" y1="0" x2="44" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E4E5E7" />
          <stop offset="0.765625" stopColor="#E4E5E7" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}