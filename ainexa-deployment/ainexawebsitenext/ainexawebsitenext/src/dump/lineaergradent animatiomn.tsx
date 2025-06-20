
const AnimatedText = () => {
  return (
    <svg viewBox="0 0 500 100" width="100%" height="100">
      <defs>
        <linearGradient id="stroke-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff00cc" />
          <stop offset="50%" stopColor="#3333ff" />
          <stop offset="100%" stopColor="#ff00cc" />
        </linearGradient>

        <mask id="text-mask">
          <text
            x="50%"
            y="70%"
            textAnchor="middle"
            fontSize="60"
            fontWeight="bold"
            fill="white"
          >
            STEPCONE
          </text>
        </mask>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="url(#stroke-gradient)"
        mask="url(#text-mask)"
      >
        <animateTransform
          attributeName="gradientTransform"
          type="translate"
          from="-1 0"
          to="1 0"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
};