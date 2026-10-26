import React, { useEffect, useState } from 'react';
import { useWatch } from '../context/WatchContext';

interface InteractiveWatchDialProps {
  type?: 'heritage' | 'vanguard' | 'elite' | 'classic';
  size?: number; // diameter in pixels (default: 340)
  interactive?: boolean;
  className?: string;
}

export const InteractiveWatchDial: React.FC<InteractiveWatchDialProps> = ({
  type = 'vanguard',
  size = 340,
  interactive = true,
  className = ''
}) => {
  const { lumeMode, sweepSecondMode } = useWatch();

  // Mechanical hand angles
  const [time, setTime] = useState({
    hours: 10,
    minutes: 10,
    seconds: 30,
    milliseconds: 0
  });

  useEffect(() => {
    let animFrameId: number;

    const updateTime = () => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        milliseconds: now.getMilliseconds()
      });

      if (sweepSecondMode) {
        animFrameId = requestAnimationFrame(updateTime);
      }
    };

    if (sweepSecondMode) {
      animFrameId = requestAnimationFrame(updateTime);
      return () => cancelAnimationFrame(animFrameId);
    } else {
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [sweepSecondMode]);

  // Calculate rotations
  const secondAngle = sweepSecondMode
    ? (time.seconds + time.milliseconds / 1000) * 6
    : time.seconds * 6;
  const minuteAngle = (time.minutes + time.seconds / 60) * 6;
  const hourAngle = ((time.hours % 12) + time.minutes / 60) * 30;

  // Dial specific theme tokens
  const theme = {
    heritage: {
      dialBg: '#101012',
      innerRing: '#22201D',
      bezel: '#28282B',
      bezelHighlight: '#404044',
      accent: '#C6A66B',
      hands: '#4A6FA5', // thermally blued hands
      text: '#E5D8C5',
      lumeColor: '#2BE4A1'
    },
    vanguard: {
      dialBg: '#090A0D',
      innerRing: '#16181F',
      bezel: '#3A3E47',
      bezelHighlight: '#68707F',
      accent: '#C6A66B',
      hands: '#E2E8F0',
      text: '#F1F5F9',
      lumeColor: '#2BE4A1'
    },
    elite: {
      dialBg: '#080E1A', // royal navy
      innerRing: '#121F38',
      bezel: '#C6A66B', // 18k champagne gold
      bezelHighlight: '#F1D89D',
      accent: '#F1D89D',
      hands: '#E6C687',
      text: '#F5E6C8',
      lumeColor: '#38F9B6'
    },
    classic: {
      dialBg: '#0B0B0C',
      innerRing: '#17171A',
      bezel: '#2D2D32',
      bezelHighlight: '#4F4F57',
      accent: '#C6A66B',
      hands: '#D4D4D8',
      text: '#E4E4E7',
      lumeColor: '#2BE4A1'
    }
  }[type];

  const luminous = lumeMode;

  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full drop-shadow-2xl transition-all duration-700"
        style={{
          filter: luminous
            ? 'drop-shadow(0 0 35px rgba(43, 228, 161, 0.45)) drop-shadow(0 20px 40px rgba(0,0,0,0.9))'
            : 'drop-shadow(0 25px 50px rgba(0,0,0,0.85))'
        }}
      >
        <defs>
          {/* Radial Metallic Bezel Gradient */}
          <radialGradient id={`bezel-grad-${type}`} cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor={theme.bezelHighlight} />
            <stop offset="35%" stopColor={theme.bezel} />
            <stop offset="70%" stopColor="#111113" />
            <stop offset="100%" stopColor={theme.bezel} />
          </radialGradient>

          {/* Dial Sunburst Texture */}
          <radialGradient id={`dial-grad-${type}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={luminous ? '#04100D' : theme.innerRing} />
            <stop offset="65%" stopColor={luminous ? '#020806' : theme.dialBg} />
            <stop offset="100%" stopColor="#040405" />
          </radialGradient>

          {/* Sapphire Crystal Reflection Glint */}
          <linearGradient id={`sapphire-reflection-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="28%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="75%" stopColor="rgba(198,166,107,0.06)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
          </linearGradient>

          {/* Lume Glow Filter */}
          <filter id={`lume-glow-${type}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Case Lug Projections */}
        <path
          d="M 120 40 L 145 75 L 255 75 L 280 40 Z"
          fill="#1C1C1F"
          stroke={theme.bezelHighlight}
          strokeWidth="1.5"
        />
        <path
          d="M 120 360 L 145 325 L 255 325 L 280 360 Z"
          fill="#1C1C1F"
          stroke={theme.bezelHighlight}
          strokeWidth="1.5"
        />

        {/* 2. Outer Bezel & Coin-Edge Teeth */}
        <circle
          cx="200"
          cy="200"
          r="192"
          fill={`url(#bezel-grad-${type})`}
          stroke="#0F0F12"
          strokeWidth="4"
        />

        {/* Outer Ring Accent */}
        <circle
          cx="200"
          cy="200"
          r="184"
          fill="none"
          stroke={theme.bezelHighlight}
          strokeWidth="1.5"
          opacity="0.7"
        />

        {/* 3. Crown at 3 O'clock */}
        <rect
          x="386"
          y="186"
          width="12"
          height="28"
          rx="2"
          fill={theme.bezel}
          stroke={theme.bezelHighlight}
          strokeWidth="1"
        />
        <line x1="390" y1="188" x2="390" y2="212" stroke="#111" strokeWidth="1" />
        <line x1="394" y1="188" x2="394" y2="212" stroke="#111" strokeWidth="1" />

        {/* 4. Main Dial Surface */}
        <circle
          cx="200"
          cy="200"
          r="176"
          fill={`url(#dial-grad-${type})`}
          stroke="#1F1F24"
          strokeWidth="2"
        />

        {/* Guilloché Concentric Circles */}
        <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <circle cx="200" cy="200" r="105" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        {/* Open-Heart Skeleton Window for Élite Collection */}
        {type === 'elite' && (
          <g transform="translate(200, 260)">
            <circle
              cx="0"
              cy="0"
              r="34"
              fill="#06090F"
              stroke="#C6A66B"
              strokeWidth="1.5"
            />
            {/* Balance Wheel Spoke and Ruby Jewel */}
            <g transform={`rotate(${time.milliseconds * 1.8})`}>
              <circle cx="0" cy="0" r="28" fill="none" stroke="#D1B074" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="-24" y1="0" x2="24" y2="0" stroke="#F1D89D" strokeWidth="2" />
              <line x1="0" y1="-24" x2="0" y2="24" stroke="#F1D89D" strokeWidth="2" />
            </g>
            <circle cx="0" cy="0" r="5" fill="#D6336C" stroke="#fff" strokeWidth="0.8" />
          </g>
        )}

        {/* Small Seconds Sub-Dial for Heritage Collection */}
        {type === 'heritage' && (
          <g transform="translate(200, 260)">
            <circle cx="0" cy="0" r="28" fill="#141417" stroke="#C6A66B" strokeWidth="0.8" />
            <circle cx="0" cy="20" textAnchor="middle" fill="#888" fontSize="6" fontFamily="var(--font-mono)">30</circle>
            <line
              x1="0"
              y1="4"
              x2="0"
              y2="-22"
              stroke="#C6A66B"
              strokeWidth="1"
              transform={`rotate(${secondAngle})`}
            />
          </g>
        )}

        {/* 5. Minute Track (60 ticks) */}
        {Array.from({ length: 60 }).map((_, i) => {
          const isFiveMinute = i % 5 === 0;
          const angle = i * 6;
          const tickLength = isFiveMinute ? 10 : 4;
          const strokeW = isFiveMinute ? 2 : 1;
          const strokeColor = isFiveMinute
            ? (luminous ? theme.lumeColor : theme.accent)
            : 'rgba(255,255,255,0.2)';

          return (
            <line
              key={i}
              x1="200"
              y1={200 - 172}
              x2="200"
              y2={200 - 172 + tickLength}
              stroke={strokeColor}
              strokeWidth={strokeW}
              transform={`rotate(${angle} 200 200)`}
              filter={isFiveMinute && luminous ? `url(#lume-glow-${type})` : undefined}
            />
          );
        })}

        {/* 6. Hour Indices (12 positions) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const isMajor = i % 3 === 0;
          return (
            <g key={i} transform={`rotate(${angle} 200 200)`}>
              {/* Faceted Hour Baton */}
              <rect
                x="196"
                y="36"
                width="8"
                height={isMajor ? "22" : "16"}
                rx="1"
                fill={luminous ? theme.lumeColor : (isMajor ? theme.accent : theme.text)}
                stroke={luminous ? '#fff' : '#111'}
                strokeWidth="0.8"
                filter={luminous ? `url(#lume-glow-${type})` : undefined}
              />
            </g>
          );
        })}

        {/* 7. Brand Wordmark & Dial Inscriptions */}
        <text
          x="200"
          y="130"
          textAnchor="middle"
          fill={theme.text}
          fontSize="17"
          letterSpacing="5"
          fontWeight="600"
          fontFamily="var(--font-sans)"
        >
          CHRONOVA
        </text>

        <text
          x="200"
          y="146"
          textAnchor="middle"
          fill={theme.accent}
          fontSize="7.5"
          letterSpacing="3"
          fontFamily="var(--font-mono)"
          opacity="0.85"
        >
          {type === 'heritage'
            ? 'AUTOMATIC · 28,800 VPH'
            : type === 'elite'
            ? 'TOURBILLON · 72H RESERVE'
            : type === 'vanguard'
            ? 'CHRONOMETER · 100M'
            : 'PRECISION SLIM · 7.2MM'}
        </text>

        <text
          x="200"
          y="315"
          textAnchor="middle"
          fill="rgba(255,255,255,0.4)"
          fontSize="6"
          letterSpacing="2"
          fontFamily="var(--font-sans)"
        >
          GENEVE ATELIER
        </text>

        {/* 8. Mechanical Watch Hands */}
        {/* Hour Hand */}
        <g transform={`rotate(${hourAngle} 200 200)`}>
          <path
            d="M 196 215 L 194 98 L 200 84 L 206 98 L 204 215 Z"
            fill={luminous ? '#11221D' : theme.hands}
            stroke={luminous ? theme.lumeColor : '#111'}
            strokeWidth="1.2"
          />
          {/* Luminous Inlay Stripe */}
          <rect
            x="198"
            y="98"
            width="4"
            height="85"
            rx="1.5"
            fill={luminous ? theme.lumeColor : '#F1E9DB'}
            filter={luminous ? `url(#lume-glow-${type})` : undefined}
          />
        </g>

        {/* Minute Hand */}
        <g transform={`rotate(${minuteAngle} 200 200)`}>
          <path
            d="M 197 220 L 195 56 L 200 42 L 205 56 L 203 220 Z"
            fill={luminous ? '#11221D' : theme.hands}
            stroke={luminous ? theme.lumeColor : '#111'}
            strokeWidth="1.2"
          />
          {/* Luminous Inlay Stripe */}
          <rect
            x="198.5"
            y="54"
            width="3"
            height="135"
            rx="1.2"
            fill={luminous ? theme.lumeColor : '#F1E9DB'}
            filter={luminous ? `url(#lume-glow-${type})` : undefined}
          />
        </g>

        {/* Central Second Hand */}
        {type !== 'heritage' && (
          <g transform={`rotate(${secondAngle} 200 200)`}>
            <circle cx="200" cy="235" r="5" fill="#D6336C" />
            <line x1="200" y1="242" x2="200" y2="228" stroke="#D6336C" strokeWidth="1.8" />
            <line
              x1="200"
              y1="228"
              x2="200"
              y2="36"
              stroke={type === 'elite' ? '#F1D89D' : '#D6336C'}
              strokeWidth="1.4"
            />
            <polygon
              points="200,28 197,38 203,38"
              fill={type === 'elite' ? '#F1D89D' : '#FF4D4D'}
            />
          </g>
        )}

        {/* 9. Center Cap Pin */}
        <circle cx="200" cy="200" r="6" fill={theme.bezelHighlight} stroke="#000" strokeWidth="1" />
        <circle cx="200" cy="200" r="2.5" fill="#0A0A0A" />

        {/* 10. Domed Sapphire Crystal Reflection Overlay */}
        <circle
          cx="200"
          cy="200"
          r="176"
          fill={`url(#sapphire-reflection-${type})`}
          pointerEvents="none"
        />
      </svg>
    </div>
  );
};
