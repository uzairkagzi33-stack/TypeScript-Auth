// ── VerifyEmailIcon ───────────────────────────────────────────────────────────
// Same structure as CustomIcon — 88×88 circular icon with
// a white inner card containing the verify-email glyph.
//
// Props:
//   size  (number) — icon size in px, default 88
//
export default function VerifyEmailIcon({ size = 88 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle — gradient fill + gradient stroke */}
      <rect
        x="0.5" y="0.5"
        width="87" height="87"
        rx="43.5"
        fill="url(#paint0_linear_ve)"
      />
      <rect
        x="0.5" y="0.5"
        width="87" height="87"
        rx="43.5"
        stroke="url(#paint1_linear_ve)"
      />

      {/* Inner white card with drop shadow */}
      <g filter="url(#filter0_d_ve)">
        <rect x="16" y="16" width="56" height="56" rx="28" fill="white" />
        <rect x="16.5" y="16.5" width="55" height="55" rx="27.5" stroke="#E5E7EB" />

        {/* Email + checkmark glyph */}
        <path
          d="M54.5 45.4081C53.3783 45.0108 52.167 44.9393 51.0064 45.2018C49.8457 45.4644 48.7832 46.0503 47.9417 46.8918C47.1003 47.7332 46.5144 48.7958 46.2518 49.9564C45.9892 51.1171 46.0607 52.3284 46.458 53.4501H34.55C34.2715 53.4501 34.0045 53.3394 33.8075 53.1425C33.6106 52.9456 33.5 52.6785 33.5 52.4V35.6C33.5 35.3216 33.6106 35.0545 33.8075 34.8576C34.0045 34.6607 34.2715 34.55 34.55 34.55H53.45C53.7285 34.55 53.9955 34.6607 54.1925 34.8576C54.3894 35.0545 54.5 35.3216 54.5 35.6V45.4081ZM44.063 43.6672L37.3304 37.9499L35.9706 39.5501L44.0766 46.4329L52.0367 39.5449L50.6633 37.9562L44.064 43.6672H44.063ZM51.35 54.5L47.6372 50.7873L49.1229 49.3025L51.35 51.5307L55.0628 47.8178L56.5475 49.3025L51.35 54.5Z"
          fill="#4B5563"
        />
      </g>

      <defs>
        {/* Drop shadow filter for the inner card */}
        <filter
          id="filter0_d_ve"
          x="15" y="16"
          width="58" height="58"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_ve" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_ve" result="shape" />
        </filter>

        {/* Outer circle fill gradient — subtle gray fade */}
        <linearGradient
          id="paint0_linear_ve"
          x1="44" y1="0" x2="44" y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4E5E7" stopOpacity="0.48" />
          <stop offset="1" stopColor="#F7F8F8" stopOpacity="0" />
          <stop offset="1" stopColor="#E4E5E7" stopOpacity="0" />
        </linearGradient>

        {/* Outer circle stroke gradient — fades out at bottom */}
        <linearGradient
          id="paint1_linear_ve"
          x1="44" y1="0" x2="44" y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4E5E7" />
          <stop offset="0.765625" stopColor="#E4E5E7" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}