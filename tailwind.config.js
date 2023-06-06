/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                detailsRed: '#ca5534',
            },
        },
        plugins: [],
    },
}
