import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ChatPage from './Pages/ChatPage';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>

       <BrowserRouter>
        <nav>
          <Link to="/">Chat</Link> |{" "}
        </nav>
        <Routes>
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>

    </ThemeProvider>
  )
}

export default App
