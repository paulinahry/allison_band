import bcrypt from 'bcrypt'

const data = {
    users: [
        {
            userName: 'Sam Small',
            email: 'samsmall@gmail.com',
            password: 'samsmall',
        },

        {
            userName: 'Allison Crane',
            email: 'sallison@gmail.com',
            password: 'samsmall',
        },
        {
            userName: 'Amanda Cole',
            email: 'cole@gmail.com',
            password: 'samsmall',
        },
        {
            userName: 'Arizona Flam',
            email: 'flamari@gmail.com',
            password: 'samsmall',
            shippingAdress: [{ street: 'Yellow Street' }],
        },
    ],

    products: [
        {
            title: 'Vinyl Mermaid Calling',
            image: '../src/assets/images/pexels-brett-sayles-2479312.jpg',
            description: 'Vinyl ',
            stock: '100',
            price: '29.99',
        },
        {
            title: 'Vinyl Last Calling',
            image: '../src/assets/images/pexels-brett-sayles-2479312.jpg',
            description: 'Vinyl Description',
            stock: '100',
            price: '25.99',
        },
        {
            title: 'CD Mermaid Calling',
            image: '../src/assets/images/pexels-brett-sayles-2479312.jpg',
            description: 'CD Description',
            stock: '100',
            price: '10.99',
        },
        {
            title: 'T-Shirt mermaid',
            image: '../src/assets/images/pexels-brett-sayles-2479312.jpg',
            description: 'desc ',
            stock: '5',
            price: '49.99',
        },
    ],
}
export default data
