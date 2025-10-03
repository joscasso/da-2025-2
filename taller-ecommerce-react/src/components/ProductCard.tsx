import { useState } from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [showReviews, setShowReviews] = useState<boolean>(false);

  const handleAddToCart = () => {
    setIsAdded(!isAdded);
  };

  const handleToggleReviews = () => {
    setShowReviews(!showReviews);
  };

  return (
    <div className="product-card">
      <img src={product.imagen} alt={product.nombre} className="product-image" />
      <div className="product-info">
        <h3>{product.nombre}</h3>
        <p>{product.descripcion}</p>
        <span className="product-price">${product.precio.toFixed(2)}</span>
        <div className="button-group">
          <button 
            onClick={handleAddToCart} 
            //disabled={isAdded} 
            className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
          >
            {isAdded ? "Eliminar del carrito" : "Agregar al Carrito"}
          </button>
          <button 
            onClick={handleToggleReviews} 
            className="toggle-reviews-btn"
          >
            {showReviews ? "Ocultar Reseñas" : "Mostrar Reseñas"}
          </button>
        </div>

        {/* Renderizamos las reseñas solo si showReviews es verdadero. 
          Usamos una clase CSS para controlar la visibilidad.
        */}
        <div className={`reviews-container ${showReviews ? 'visible' : ''}`}>
          <h4>Reseñas:</h4>
          {product.reseñas && product.reseñas.length > 0 ? (
            product.reseñas.map((review, index) => (
              <div key={index} className="review">
                <strong>{review.usuario}:</strong>
                <p>{review.texto}</p>
                <small>{review.fecha}</small>
              </div>
            ))
          ) : (
            <p>No hay reseñas para este producto.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
