/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // use the .dark class on the html element
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background-rgb) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground-rgb) / <alpha-value>)',
        card: 'rgb(var(--color-card-rgb) / <alpha-value>)',
        'card-foreground': 'rgb(var(--color-card-foreground-rgb) / <alpha-value>)',
        popover: 'rgb(var(--color-popover-rgb) / <alpha-value>)',
        'popover-foreground': 'rgb(var(--color-popover-foreground-rgb) / <alpha-value>)',
        primary: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
        'primary-foreground': 'rgb(var(--color-primary-foreground-rgb) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary-rgb) / <alpha-value>)',
        'secondary-foreground': 'rgb(var(--color-secondary-foreground-rgb) / <alpha-value>)',
        muted: 'rgb(var(--color-muted-rgb) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--color-muted-foreground-rgb) / <alpha-value>)',
        accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        'accent-foreground': 'rgb(var(--color-accent-foreground-rgb) / <alpha-value>)',
        destructive: 'rgb(var(--color-destructive-rgb) / <alpha-value>)',
        'destructive-foreground': 'rgb(var(--color-destructive-foreground-rgb) / <alpha-value>)',
        border: 'rgb(var(--color-border-rgb) / <alpha-value>)',
        input: 'rgb(var(--color-input-rgb) / <alpha-value>)',
        ring: 'rgb(var(--color-ring-rgb) / <alpha-value>)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
