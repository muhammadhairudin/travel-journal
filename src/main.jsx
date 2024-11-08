import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import { ApiProvider } from './context/ApiContext'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <ApiProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ApiProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>,
)
