const fs = require('fs');
const handlebars = require('handlebars');

// Load HTML template
const source = fs.readFileSync('templates/order-confirmation.html', 'utf8');
const template = handlebars.compile(source);

// Dynamic data
const data = {
    customerName: 'David',
    orderNumber: 'INV-1001',
    orderDate: 'April 11, 2025',
    items: [
        { name: 'Web Hosting Plan', quantity: 1, price: '$99.00' },
        { name: 'UI/UX Design Kit', quantity: 2, price: '$198.00' },
    ],
    totalAmount: '$297.00',
    shippingAddress: {
        name: 'David Igberi',
        street: '123 Web Lane',
        city: 'Bayelsa',
        state: 'NG',
        zip: '560001',
        country: 'Nigeria'
    },
    trackOrderUrl: 'https://yourwebsite.com/track?order=INV-1001'
};

// Render email
const emailHtml = template(data);

// Save output as file (optional preview)
fs.writeFileSync('output.html', emailHtml);

console.log('✅ Email generated successfully!');
