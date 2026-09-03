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
        'alliance': ['Alliance No.1 Regular', 'sans-serif'],
        'alliance-2': ['Alliance No.2 Regular', 'sans-serif'],
        'geist-semibold': ['Geist SemiBold', 'sans-serif'],
        'geist-medium': ['Geist Medium', 'sans-serif'],
        'geist-light': ['Geist Light', 'sans-serif'],
        'geist-regular': ['Geist Regular', 'sans-serif'],
        'getai': ['DT Getai Grotesk Display Black', 'sans-serif'],
        'ebgaramond-semibold': ['EBGaramond SemiBold', 'sans-serif'],
        'ebgaramond-bold': ['EBGaramond SemiBold', 'sans-serif'],
        'space-medium': ['Space Grotesk', 'sans-serif'],
        'space-regular': ['Space Grotesk Regular', 'sans-serif'],
        'inter-regular': ['Inter Regular', 'sans-serif'],
        'inter-medium': ['Inter Medium', 'sans-serif'],

      },
    },
  },
  plugins: [],
}

