let cartItems = []; // Array-ul global care va conține produsele din coș

// Funcția care adaugă un produs în coș
function addToCart(id, name, price, image) {
    // Verifică dacă produsul există deja în coș
    const productIndex = cartItems.findIndex(item => item.id === id);

    if (productIndex > -1) {
        // Dacă produsul există deja, actualizăm cantitatea
        cartItems[productIndex].quantity += 1;
    } else {
        // Dacă produsul nu există, îl adăugăm în coș
        cartItems.push({
            id,
            name,
            price,
            image,
            quantity: 1
        });
    }

    // Actualizăm afișarea coșului
    updateCart();
}

// Funcția care actualizează vizual coșul de cumpărături
function updateCart() {
    const cartContainer = document.getElementById('cart'); // Containerul coșului
    cartContainer.innerHTML = '<h2>Your Cart</h2>'; // Golește coșul înainte de a-l actualiza

    let total = 0;

    // Parcurgem fiecare produs din coș și îl adăugăm în pagina HTML
    cartItems.forEach(item => {
        total += item.price * item.quantity; // Calculăm totalul pe baza prețului și cantității

        // Adăugăm produsul în coș
        cartContainer.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3 id="cart-itm">${item.name}</h3>
                    <div class="quality-price">
                        <h3>${item.quantity}X </h3>
                        <p>@ $${item.price}</p>
                        <h4>$ ${item.price * item.quantity} </h4>
                    </div>
                </div>
                <i class="remove-from-cart fa-regular fa-circle-xmark" data-id="${item.id}"></i>
            </div>
        `;
    });

    // Adăugăm totalul coșului
    cartContainer.innerHTML += `
        <div class="cart-total">
            <span>Order total </span>
            <h2>$${total.toFixed(2)}</h2>
        </div>
    `;

    // Adăugăm butonul de Confirmare comandă
    cartContainer.innerHTML += `
        <button id="confirm-order" class="confirm-order-btn">Confirm Order</button>
    `;

    // Adăugăm event listeners pentru butoanele de ștergere
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            removeFromCart(productId); // Ștergem produsul din coș
        });
    });

    // Adăugăm event listener pentru butonul de confirmare comandă
    const confirmOrderButton = document.getElementById('confirm-order');
    if (confirmOrderButton) {
        confirmOrderButton.addEventListener('click', () => {
            confirmOrder();
        });
    }
}

// Funcția care elimină un produs din coș
function removeFromCart(productId) {
    // Eliminăm produsul din coș
    cartItems = cartItems.filter(item => item.id !== productId);
    
    // Actualizăm coșul
    updateCart();
}

// Funcția care confirmă comanda și arată produsele comandate
function confirmOrder() {
    // Ascundem coșul
    const cartContainer = document.getElementById('cart-container');
    cartContainer.style.display = 'none';

    // Afișăm mesajul de confirmare cu produsele
    const confirmationMessage = document.createElement('div');
    confirmationMessage.classList.add('confirmation-message');
    confirmationMessage.innerHTML = `
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
        <div class="order-items">
            ${cartItems.map(item => `<div class="order-item">
                <div class="order-info"> 
                  <h3>${item.name}</h3>
                  <div>
                    <h4>${item.quantity}X</h4>
                    <p>@ $${item.price}</p>
                  </div>
                </div>
                <div class="order-total-price"> 
                    <span>$ ${item.quantity * item.price}</span>
                </div>
                    
            </div>`).join('')}
        </div>
        <div id="all-items-price">
            <span>Order Total</span>
            <h2>$${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h2>
        </div>
        
        <button onclick="location.reload()">Start New Order</button>
    `;
    document.body.appendChild(confirmationMessage);
}

// Funcția care adaugă produsele în listă atunci când se încarcă pagina
function itemsList() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const itemsContainer = document.getElementById('items');
            itemsContainer.innerHTML = ''; // Curăță lista de produse înainte de a o popula
            data.forEach(item => {
                itemsContainer.innerHTML += `
                    <div class="item">
                        <div class="img">
                            <img src="${item.image.desktop}" alt="${item.name}">
                            <button class="add-cart" data-id="${item.name}" data-name="${item.name}" data-price="${item.price}" data-image="${item.image.desktop}">
                                <i class="fa-solid fa-cart-shopping"></i> Add To Cart
                            </button>
                        </div>
                        <div class="info">
                            <p>${item.category}</p>
                            <h2>${item.name}</h2>
                            <h3>$${item.price}</h3>
                        </div>
                    </div>
                `;
            });

            addEventListenersToAddCartButtons(); // Adaugă event listeners pentru butoanele de adăugare în coș
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
}

// Funcția care adaugă event listeners pentru fiecare buton de adăugare în coș
function addEventListenersToAddCartButtons() {
    const buttons = document.querySelectorAll('.add-cart');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const image = e.target.getAttribute('data-image');
            
            // Adăugăm produsul în coș
            addToCart(id, name, price, image);
        });
    });
}

// Apelăm funcția `itemsList` atunci când pagina este complet încărcată
document.addEventListener('DOMContentLoaded', function() {
    itemsList();
});
