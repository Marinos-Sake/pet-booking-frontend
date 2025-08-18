import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./features/auth/useAuth.tsx";

// DEBUG
window.addEventListener("error", (e) => {
    console.error("[GLOBAL ERROR]", e.error || e.message, e);
});
window.addEventListener("unhandledrejection", (e) => {
    console.error("[UNHANDLED PROMISE REJECTION]", e.reason || e);
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <AuthProvider>
              <App />
          </AuthProvider>
      </BrowserRouter>
  </StrictMode>,
)
