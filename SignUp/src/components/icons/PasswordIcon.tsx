import React from "react";

export default function PasswordIcon() {
  return (
    <svg
      width={88}
      height={88}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      
    >
      <rect
        x="0.5"
        y="0.5"
        width="87"
        height="87"
        rx="43.5"
        fill="url(#paint0_linear)"
      />
      <rect
        x="0.5"
        y="0.5"
        width="87"
        height="87"
        rx="43.5"
        stroke="url(#paint1_linear)"
      />

      <g filter="url(#filter0_d)">
        <rect x="16" y="16" width="56" height="56" rx="28" fill="white" />
        <rect
          x="16.5"
          y="16.5"
          width="55"
          height="55"
          rx="27.5"
          stroke="#E5E7EB"
        />
        <path
          d="M44 32.45L52.6279 34.3673C52.8611 34.4191 53.0696 34.5489 53.2191 34.7352C53.3685 34.9215 53.45 35.1532 53.4501 35.3921V45.8784C53.45 46.9155 53.1939 47.9366 52.7044 48.851C52.215 49.7653 51.5074 50.5447 50.6444 51.12L44 55.5499L37.3556 51.12C36.4928 50.5448 35.7853 49.7656 35.2959 48.8514C34.8065 47.9372 34.5503 46.9164 34.55 45.8795V35.3921C34.5501 35.1532 34.6316 34.9215 34.781 34.7352C34.9305 34.5489 35.139 34.4191 35.3722 34.3673L44 32.45ZM44 38.75C43.5378 38.75 43.0884 38.9025 42.7217 39.1839C42.355 39.4654 42.0913 39.8599 41.9717 40.3064C41.8521 40.7529 41.8831 41.2265 42.06 41.6535C42.2369 42.0806 42.5497 42.4374 42.95 42.6686V47.15H45.05L45.0511 42.6686C45.4515 42.4374 45.7644 42.0805 45.9413 41.6533C46.1181 41.2261 46.1491 40.7525 46.0293 40.3059C45.9095 39.8593 45.6457 39.4648 45.2788 39.1835C44.9119 38.9021 44.4624 38.7497 44 38.75Z"
          fill="#4B5563"
        />
      </g>

      <defs>
        <filter
          id="filter0_d"
          x="15"
          y="16"
          width="58"
          height="58"
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
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>

        <linearGradient
          id="paint0_linear"
          x1="44"
          y1="0"
          x2="44"
          y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4E5E7" stopOpacity="0.48" />
          <stop offset="1" stopColor="#F7F8F8" stopOpacity="0" />
          <stop offset="1" stopColor="#E4E5E7" stopOpacity="0" />
        </linearGradient>

        <linearGradient
          id="paint1_linear"
          x1="44"
          y1="0"
          x2="44"
          y2="88"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E4E5E7" />
          <stop offset="0.765625" stopColor="#E4E5E7" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

