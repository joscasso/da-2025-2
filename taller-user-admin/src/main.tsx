import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux'; // Importar Provider
import { store } from './store/store'; // Importar la store

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envolvemos toda la aplicación con el Provider de Redux */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
