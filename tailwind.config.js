/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#0df2f2",
                "background-light": "#f5f8f8",
                "background-dark": "#0a1212",
                "neutral-dark": "#162a2a",
                "accent-green": "#22c55e",
                "bg-deep": "#0a0a0c",
                "bg-card": "rgba(22, 22, 26, 0.7)",
                "bg-sidebar": "rgba(13, 13, 15, 0.85)",
                "glass-border": "rgba(255, 255, 255, 0.08)",
                "accent-neon": "#0df2f2",
                "text-primary": "#f0f0f2",
                "text-secondary": "#94949e",
                "text-muted": "#62626e",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
        },
    },
    plugins: [],
}
