// Payment Methods Configuration
const paymentMethods = {
    'bbva': {
        name: 'BBVA',
        instructions: 'Transferencia a cuenta BBVA 1234-5678-9012-3456 a nombre de Faktorx Store C.A. RIF: J-12345678-9',
        image: 'assets/icons/bbva.png'
    },
    'banco-de-venezuela': {
        name: 'Banco de Venezuela',
        instructions: 'Transferencia a cuenta Banco de Venezuela 9876-5432-1098-7654 a nombre de Faktorx Store C.A. RIF: J-12345678-9',
        image: 'assets/icons/banco-de-venezuela.png'
    },
    'paypal': {
        name: 'PayPal',
        instructions: 'Pago a través de PayPal a la cuenta contacto@faktorxstore.com',
        image: 'assets/icons/paypal.png'
    },
    'zelle': {
        name: 'Zelle',
        instructions: 'Transferencia Zelle a example@email.com a nombre de Faktorx Store',
        image: 'assets/icons/zelle.png'
    },
    'yape': {
        name: 'Yape',
        instructions: 'Pago móvil al número +58 412 555 1234',
        image: 'assets/icons/yape.png'
    }
};

// Initialize Payment Methods
document.addEventListener('DOMContentLoaded', () => {
    // In a real app, you might fetch available payment methods from an API
    
    // Example of how to handle payment method selection
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            updatePaymentInstructions(e.target.value);
        });
    });
});

function updatePaymentInstructions(method) {
    const instructionsContainer = document.getElementById('transfer-instructions');
    
    // In a real app, you would customize this based on the selected method
    switch(method) {
        case 'transferencia':
            instructionsContainer.innerHTML = `
                <h5 class="font-semibold mb-2">Instrucciones para Transferencia:</h5>
                <p class="text-sm mb-2">1. Realiza la transferencia a una de nuestras cuentas:</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div class="bg-white p-3 rounded border">
                        <h6 class="font-medium">BBVA</h6>
                        <p class="text-sm">Cuenta: 1234-5678-9012-3456</p>
                        <p class="text-sm">A nombre de: Faktorx Store C.A.</p>
                        <p class="text-sm">RIF: J-12345678-9</p>
                    </div>
                    <div class="bg-white p-3 rounded border">
                        <h6 class="font-medium">Banco de Venezuela</h6>
                        <p class="text-sm">Cuenta: 9876-5432-1098-7654</p>
                        <p class="text-sm">A nombre de: Faktorx Store C.A.</p>
                        <p class="text-sm">RIF: J-12345678-9</p>
                    </div>
                </div>
                <p class="text-sm mb-2">2. Sube el comprobante de pago:</p>
                <input type="file" class="form-input text-sm p-2">
            `;
            break;
        case 'paypal':
            instructionsContainer.innerHTML = `
                <h5 class="font-semibold mb-2">Instrucciones para PayPal:</h5>
                <p class="text-sm mb-4">Realiza el pago a través de PayPal a la cuenta: <strong>contacto@faktorxstore.com</strong></p>
                <p class="text-sm mb-2">Una vez completado el pago, envía el comprobante:</p>
                <input type="file" class="form-input text-sm p-2">
            `;
            break;
        case 'zelle':
            instructionsContainer.innerHTML = `
                <h5 class="font-semibold mb-2">Instrucciones para Zelle:</h5>
                <p class="text-sm mb-4">Realiza la transferencia Zelle a: <strong>example@email.com</strong> a nombre de <strong>Faktorx Store</strong></p>
                <p class="text-sm mb-2">Una vez completada la transferencia, envía el comprobante:</p>
                <input type="file" class="form-input text-sm p-2">
            `;
            break;
        case 'yape':
            instructionsContainer.innerHTML = `
                <h5 class="font-semibold mb-2">Instrucciones para Yape:</h5>
                <p class="text-sm mb-4">Realiza el pago móvil al número: <strong>+58 412 555 1234</strong></p>
                <p class="text-sm mb-2">Una vez completado el pago, envía el comprobante:</p>
                <input type="file" class="form-input text-sm p-2">
            `;
            break;
        default:
            instructionsContainer.innerHTML = '';
    }
}

// Form Validation
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !subject || !message) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // In a real app, you would send this to your backend
    alert('Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    e.target.reset();
});

document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (!email) {
        alert('Por favor ingresa tu correo electrónico');
        return;
    }
    
    // In a real app, you would send this to your backend
    alert('Gracias por suscribirte a nuestro newsletter!');
    e.target.reset();
});
