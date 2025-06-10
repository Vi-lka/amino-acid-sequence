import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './lib/theme'
import Home from './pages/home'

function App() {
  return (
    <ThemeProvider theme={theme}> 
      <CssBaseline />
      <Home />
    </ThemeProvider>
  )
}

export default App
