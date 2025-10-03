const productGrid = document.getElementById('product-grid');

// Crea un elemento htmnl con clase
const createElementWithClass = (tag, className) => {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    return element;
};

// Muestra un producto
const displayProduct = (product) => {
    // Crear la tarjeta del producto
    const productCard = createElementWithClass('div', 'product-card');

    // Crear imagen del producto
    const productImage = createElementWithClass('img');
    productImage.src = product.imagen;
    productImage.alt = product.nombre;
    productCard.appendChild(productImage);

    // Crear contenedor de texto
    const productInfo = createElementWithClass('div', 'product-info');

    // Crear nombre
    const productName = createElementWithClass('h2');
    productName.textContent = product.nombre;
    productInfo.appendChild(productName);

    // Crear descripción
    const productDescription = createElementWithClass('p');
    productDescription.textContent = product.descripcion;
    productInfo.appendChild(productDescription);

    // Crear precio
    const productPrice = createElementWithClass('p', 'product-price');
    productPrice.textContent = `$${product.precio.toFixed(2)}`;
    productInfo.appendChild(productPrice);

    // Crear botón "Agregar al Carrito"
    const addButton = createElementWithClass('button', 'add-to-cart-btn');
    addButton.textContent = 'Agregar al Carrito';
    addButton.addEventListener('click', () => { 
        addButton.textContent = 'Agregado';
        addButton.disabled = true;
    });
    
    productInfo.appendChild(addButton);

    // Crear sección de reseñas
    const reviewsSection = createElementWithClass('div', 'reviews-section');
    const showReviewsBtn = createElementWithClass('button', 'show-reviews-btn');
    showReviewsBtn.textContent = 'Mostrar Reseñas';
    reviewsSection.appendChild(showReviewsBtn);

    const reviewsList = createElementWithClass('ul', 'reviews-list hidden');

    if (product.reseñas && product.reseñas.length > 0) {
        product.reseñas.forEach(review => {
            const reviewItem = createElementWithClass('li', 'review-item');
            reviewItem.innerHTML = `
                <strong>${review.usuario}</strong> (${review.fecha}): 
                <span>${review.texto}</span>
            `;
            reviewsList.appendChild(reviewItem);
        });
    } else {
        const noReviewsItem = createElementWithClass('li');
        noReviewsItem.textContent = 'No hay reseñas para este producto.';
        reviewsList.appendChild(noReviewsItem);
    }

    showReviewsBtn.addEventListener('click', () => {
        reviewsList.classList.toggle('hidden');
        if (reviewsList.classList.contains('hidden')) {
            showReviewsBtn.textContent = 'Mostrar Reseñas';
        } else {
            showReviewsBtn.textContent = 'Ocultar Reseñas';
        }
    });

    reviewsSection.appendChild(reviewsList);
    productInfo.appendChild(reviewsSection);

    productCard.appendChild(productInfo);
    productGrid.appendChild(productCard);
}

// Cargar los productos desde el archivo JSON
fetch('data.json')
    .then(response => response.json())
    .then(products => {

        // Recorre el listado de productos para agregarlos a la página
        products.forEach(product => {
            displayProduct(product)
        });
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });