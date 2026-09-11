import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { InteractiveExperienceProvider } from './interactive/InteractiveExperienceContext';
import './styles/tokens.css';
import './styles/global.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element is missing');
}

createRoot(root).render(
  <StrictMode>
    <InteractiveExperienceProvider>
      <App />
    </InteractiveExperienceProvider>
  </StrictMode>
);
