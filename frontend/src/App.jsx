import { Box, useColorModeValue } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import SearchBar from "./components/SearchBar"
import { darkTheme, lightTheme } from "./components/LayoutConfig"

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue(lightTheme.background, darkTheme.background)}>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
      </Routes>
    </Box>
  )
}

export default App
