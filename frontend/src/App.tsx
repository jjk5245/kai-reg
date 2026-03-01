import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from './Pages/ChatPage';
import ToolsPage from './Pages/ToolsPage';

export const chatPageRoute = "/";
export const toolsPageRoute ="/tools";

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
       <BrowserRouter>
        <Routes>
          <Route path={chatPageRoute} element={<ChatPage />} />
          <Route path={toolsPageRoute} element={<ToolsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
