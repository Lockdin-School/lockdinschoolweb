/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Map Tailwind color names to your CSS variables
        text: 'var(--text)',
        'text-h': 'var(--text-h)',
        bg: 'var(--bg)',
        'code-bg': 'var(--code-bg)',
        accent: 'var(--accent)',
        'accent-bg': 'var(--accent-bg)',
        'accent-border': 'var(--accent-border)',
        'social-bg': 'var(--social-bg)',
        border: 'var(--border)',
      },
      boxShadow: {
        'custom': 'var(--shadow)',
      },
      fontFamily: {
        // 'custom' becomes the class name: <h1 class="font-custom">
        'geist-semibold': ['Geist SemiBold', 'sans-serif'],
        'getai': ['DT Getai Grotesk Display Black', 'sans-serif'],
        'ebgaramond-semibold': ['EBGaramond SemiBold', 'sans-serif'],
        'ebgaramond-bold': ['EBGaramond SemiBold', 'sans-serif']
      },
    },
  },
  plugins: [],
}

