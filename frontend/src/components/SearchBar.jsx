import { Box, Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import { PlusSquareIcon } from "@chakra-ui/icons"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { searchBarHeight } from './LayoutConfig'

const SearchBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"100%"} px={"0"} >
      <Flex
        h={searchBarHeight}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
      >

        <Box w={"50%"} bg={"gray.100"} p={"2.5"} >Search Bar</Box>

        <HStack spacing={"2"} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <PlusSquareIcon fontSize={"20"}/>
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun fontSize={"20"} /> }
          </Button>
        </HStack>

      </Flex>
    </Container>
  );
}

export default SearchBar