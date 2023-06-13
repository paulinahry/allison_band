/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                details: '#f7d5b1',
                main: '#2C3139',
                yellowish: '#F4B860',
                pinkish: '#FEC0CE',
                greenish: '#87BAAB',
            },
            fonts: {},
        },
        plugins: [],
    },
}
