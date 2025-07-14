import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { prefetchImages } from './helpers/imagePrefetcher.ts';

// Prefetch important images
prefetchImages();

// Initialize the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);