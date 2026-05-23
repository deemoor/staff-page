import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    
    fontWeightRegular: 400, 

    button: {
      textTransform: 'none',
    },

    h1: { 
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: { 
      fontSize: '1.2rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
})