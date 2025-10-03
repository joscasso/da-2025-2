import ProductCard from './components/ProductCard';
import productsData from './products.json';
import type { Product } from './types';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="main-title">Catálogo de Productos</h1>
      <div className="product-grid">
        {(productsData as Product[]).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default App;


