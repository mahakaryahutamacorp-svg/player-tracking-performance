import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          base: '#1A1A1A',   // Charcoal — warna latar dasar
          card: '#2A2A2A',   // Charcoal lebih terang — latar kartu
          gold: '#D4AF37',   // Emas Metalik — teks utama, border, tombol aktif
        },
      },
    },
  },
  plugins: [],
}

export default config
