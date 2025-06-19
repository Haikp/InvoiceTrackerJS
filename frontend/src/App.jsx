import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage"
import SearchBar from "./components/SearchBar"
import { darkTheme, lightTheme } from "./components/LayoutConfig"

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  if (colorMode === 'light')
    toggleColorMode()

  return (
    <Box minH={"100vh"} bg={darkTheme.background}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </Box>
  )
}

export default App
