/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    900: '#000B18', // Deep Navy Background
                    800: '#001529', // Card Background
                },
                cyan: {
                    400: '#00E5FF', // Neon Cyan Accent
                    500: '#06b6d4',
                },
                emerald: {
                    400: '#10B981', // Status Green
                    500: '#10B981',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
