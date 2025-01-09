const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pizzaCard = button.closest('.pizza-card');
        const pizzaName = pizzaCard.querySelector('.pizza-name').textContent;
        const pizzaPrice = pizzaCard.querySelector('.pizza-price').textContent.replace('R$', '').trim();
        const pizzaImg = pizzaCard.querySelector('.pizza-img').src;
        const cartItems = document.getElementById('cart-items');
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${pizzaImg}" alt="${pizzaName}">
            <div class="cart-item-details">
                <span>${pizzaName}</span>
                <span>R$ ${pizzaPrice}</span>
            </div>
            <span class="cart-item-remove">Remover</span>
        `;
        cartItems.appendChild(cartItem);
        const cartTotalAmount = document.getElementById('cart-total-amount');
        const currentTotal = parseFloat(cartTotalAmount.textContent);
        const newTotal = currentTotal + parseFloat(pizzaPrice);
        cartTotalAmount.textContent = newTotal.toFixed(2);
        const cartCount = document.querySelector('.cart-count');
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;
    });
});
const closeModalButton = document.querySelector('.close-modal');
closeModalButton.addEventListener('click', () => {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'none';
    document.body.classList.remove('modal-open');
});
const cartIcon = document.querySelector('.cart-icon');
cartIcon.addEventListener('click', () => {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = 'block';
    document.body.classList.add('modal-open');
});
document.querySelector('.buy-button').addEventListener('click', () => {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'block';
    document.body.classList.add('modal-open');
});
document.querySelector('.close-modal-checkout').addEventListener('click', () => {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = 'none';
    document.body.classList.remove('modal-open');
});
document.querySelector('.checkout-button').addEventListener('click', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    const customerName = document.getElementById('checkout-name').value;
    const phone = document.getElementById('checkout-phone').value;
    const address = document.getElementById('checkout-address').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const modifications = document.getElementById('ingredients-modifications').value;

    let message = '*Novo Pedido*\n\n';
    message += `*Nome do Cliente:* ${customerName}\n`;
    message += `*Telefone:* ${phone}\n\n`;
    message += '*Itens do Pedido:*\n';
    cartItems.forEach(item => {
        const name = item.querySelector('.cart-item-details span:nth-child(1)').textContent;
        const price = item.querySelector('.cart-item-details span:nth-child(2)').textContent;
        message += `• ${name} - ${price}\n`;
    });
    if (modifications.trim()) {
        message += `\n*Modificações nos Ingredientes:*\n${modifications}`;
    }
    message += `\n\n*Total: R$ ${document.getElementById('cart-total-amount').textContent}*`;
    message += `\n\n*Endereço de Entrega:*\n${address}`;
    message += `\n\n*Forma de Pagamento:* ${paymentMethod.toUpperCase()}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5511999999999?text=${encodedMessage}`);
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('cart-total-amount').textContent = '0.00';
    document.querySelector('.cart-count').textContent = '0';
    document.getElementById('ingredients-modifications').value = '';
    document.getElementById('checkout-name').value = '';
    document.getElementById('checkout-phone').value = '';
    document.getElementById('checkout-address').value = '';
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('checkout-modal').style.display = 'none';
    document.body.classList.remove('modal-open');
});
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');
        const pizzaCards = document.querySelectorAll('.pizza-card');
        pizzaCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
function filterPizzas(searchTerm) {
    const pizzaCards = document.querySelectorAll('.pizza-card');
    searchTerm = searchTerm.toLowerCase();
    pizzaCards.forEach(card => {
        const pizzaName = card.querySelector('.pizza-name').textContent.toLowerCase();
        const pizzaDescription = card.querySelector('.pizza-description').textContent.toLowerCase();
        if (pizzaName.includes(searchTerm) || pizzaDescription.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
searchBtn.addEventListener('click', () => {
    filterPizzas(searchInput.value);
});
searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        filterPizzas(searchInput.value);
    }
});
searchInput.addEventListener('input', () => {
    filterPizzas(searchInput.value);
});
document.addEventListener('click', e => {
    if (e.target.classList.contains('cart-item-remove')) {
        const cartItem = e.target.closest('.cart-item');
        const pizzaPrice = cartItem.querySelector('.cart-item-details span:nth-child(2)').textContent.replace('R$', '').trim();
        cartItem.remove();
        const cartTotalAmount = document.getElementById('cart-total-amount');
        const currentTotal = parseFloat(cartTotalAmount.textContent);
        const newTotal = currentTotal - parseFloat(pizzaPrice);
        cartTotalAmount.textContent = newTotal.toFixed(2);
        const cartCount = document.querySelector('.cart-count');
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount - 1;
    }
});


// const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
// addToCartButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const pizzaCard = button.closest('.pizza-card');
//     const pizzaName = pizzaCard.querySelector('.pizza-name').textContent;
//     const pizzaPrice = pizzaCard.querySelector('.pizza-price').textContent.replace('R$', '').trim();
//     const pizzaImg = pizzaCard.querySelector('.pizza-img').src;
//     const cartItems = document.getElementById('cart-items');
//     const cartItem = document.createElement('div');
//     cartItem.classList.add('cart-item');
//     cartItem.innerHTML = `
//             <img src="${pizzaImg}" alt="${pizzaName}">
//             <div class="cart-item-details">
//                 <span>${pizzaName}</span>
//                 <span>R$ ${pizzaPrice}</span>
//             </div>
//             <span class="cart-item-remove">Remover</span>
//         `;
//     cartItems.appendChild(cartItem);
//     const cartTotalAmount = document.getElementById('cart-total-amount');
//     const currentTotal = parseFloat(cartTotalAmount.textContent);
//     const newTotal = currentTotal + parseFloat(pizzaPrice);
//     cartTotalAmount.textContent = newTotal.toFixed(2);
//     const cartCount = document.querySelector('.cart-count');
//     const currentCount = parseInt(cartCount.textContent);
//     cartCount.textContent = currentCount + 1;
//   });
// });
// const closeModalButton = document.querySelector('.close-modal');
// closeModalButton.addEventListener('click', () => {
//   const cartModal = document.getElementById('cart-modal');
//   cartModal.style.display = 'none';
//   document.body.classList.remove('modal-open');
// });
// const cartIcon = document.querySelector('.cart-icon');
// cartIcon.addEventListener('click', () => {
//   const cartModal = document.getElementById('cart-modal');
//   cartModal.style.display = 'block';
//   document.body.classList.add('modal-open');
// });
// document.querySelector('.buy-button').addEventListener('click', () => {
//   const confirmationModal = document.getElementById('confirmation-modal');
//   confirmationModal.style.display = 'block';
//   document.body.classList.add('modal-open');
// });
// const filterButtons = document.querySelectorAll('.filter-btn');
// filterButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     filterButtons.forEach(btn => btn.classList.remove('active'));
//     button.classList.add('active');
//     const filterValue = button.getAttribute('data-filter');
//     const pizzaCards = document.querySelectorAll('.pizza-card');
//     pizzaCards.forEach(card => {
//       if (filterValue === 'all') {
//         card.style.display = 'block';
//       } else {
//         if (card.getAttribute('data-category') === filterValue) {
//           card.style.display = 'block';
//         } else {
//           card.style.display = 'none';
//         }
//       }
//     });
//   });
// });
// const searchInput = document.getElementById('search-input');
// const searchBtn = document.getElementById('search-btn');
// function filterPizzas(searchTerm) {
//   const pizzaCards = document.querySelectorAll('.pizza-card');
//   searchTerm = searchTerm.toLowerCase();
//   pizzaCards.forEach(card => {
//     const pizzaName = card.querySelector('.pizza-name').textContent.toLowerCase();
//     const pizzaDescription = card.querySelector('.pizza-description').textContent.toLowerCase();
//     if (pizzaName.includes(searchTerm) || pizzaDescription.includes(searchTerm)) {
//       card.style.display = 'block';
//     } else {
//       card.style.display = 'none';
//     }
//   });
// }
// searchBtn.addEventListener('click', () => {
//   filterPizzas(searchInput.value);
// });
// searchInput.addEventListener('keyup', event => {
//   if (event.key === 'Enter') {
//     filterPizzas(searchInput.value);
//   }
// });
// searchInput.addEventListener('input', () => {
//   filterPizzas(searchInput.value);
// });
// document.addEventListener('click', e => {
//   if (e.target.classList.contains('cart-item-remove')) {
//     const cartItem = e.target.closest('.cart-item');
//     const pizzaPrice = cartItem.querySelector('.cart-item-details span:nth-child(2)').textContent.replace('R$', '').trim();
//     cartItem.remove();
//     const cartTotalAmount = document.getElementById('cart-total-amount');
//     const currentTotal = parseFloat(cartTotalAmount.textContent);
//     const newTotal = currentTotal - parseFloat(pizzaPrice);
//     cartTotalAmount.textContent = newTotal.toFixed(2);
//     const cartCount = document.querySelector('.cart-count');
//     const currentCount = parseInt(cartCount.textContent);
//     cartCount.textContent = currentCount - 1;
//   }
// });
// document.querySelector('.close-confirmation-modal').addEventListener('click', () => {
//   document.getElementById('confirmation-modal').style.display = 'none';
//   document.body.classList.remove('modal-open');
// });
// document.getElementById('confirm-purchase').addEventListener('click', () => {
//   const cartItems = document.querySelectorAll('.cart-item');
//   const address = document.getElementById('confirm-delivery-address').value;
//   const customerName = document.getElementById('confirm-customer-name').value;
//   let message = '*Novo Pedido*\n\n';
//   message += `*Nome do Cliente:* ${customerName}\n\n`;
//   cartItems.forEach(item => {
//     const name = item.querySelector('.cart-item-details span:nth-child(1)').textContent;
//     const price = item.querySelector('.cart-item-details span:nth-child(2)').textContent;
//     message += `• ${name} - ${price}\n`;
//   });
//   message += `\n*Total: R$ ${document.getElementById('cart-total-amount').textContent}*`;
//   message += `\n\n*Endereço de Entrega:*\n${address}`;
//   const encodedMessage = encodeURIComponent(message);
//   window.open(`https://wa.me/553197919083?text=${encodedMessage}`);
//   document.getElementById('cart-items').innerHTML = '';
//   document.getElementById('cart-total-amount').textContent = '0.00';
//   document.querySelector('.cart-count').textContent = '0';
//   document.getElementById('confirm-delivery-address').value = '';
//   document.getElementById('confirm-customer-name').value = '';
//   document.body.classList.remove('modal-open');
//   document.getElementById('cart-modal').style.display = 'none';
//   document.getElementById('confirmation-modal').style.display = 'none';
// });