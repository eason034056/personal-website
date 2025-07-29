/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 3D 網站專用的顏色系統
      colors: {
        primary: {
          50: '#fef7ff',
          100: '#fdecff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
        },
        // 角色主題色彩
        character: {
          skin: '#ffdbac',
          hair: '#8b4513',
          clothes: '#4f46e5',
        }
      },
      // 3D 場景動畫時間設定
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      // 響應式 3D 場景尺寸
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
} 