import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProviders from './context/AuthProviders.jsx';
import ThemeProvider from './ThemeProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProviders>
    <ToastContainer />
  </StrictMode>,
)
