import { Container, Flex, Grid, GridItem, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import SearchBar from '../components/SearchBar'
import { gridColumnSizes, gridRowSizes, searchBarHeight } from '../components/LayoutConfig'

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Grid
      templateAreas={`"func home search"
                      "func nav main"
                      "func nav footer"`}
      gridTemplateRows={gridRowSizes}
      gridTemplateColumns={gridColumnSizes}
      h='100vh'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='gray.300' area={'func'}>
        func
      </GridItem>
      <GridItem pl='2' bg='yellow.300' area={'home'}>
        <Flex
          h={searchBarHeight}
          alignItems={"center"}
          flexDir={{
            base:"column",
            sm:"row"
          }}
        >
          <Text
            fontSize={{ base: "22", sm: "20" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}
          >
            <Link to={"/"}>Invoice Tracker</Link>
          </Text>
        </Flex>
      </GridItem>
      <GridItem pl='2' bg='yellow.300' area={'search'}>
        <SearchBar />
      </GridItem>
      <GridItem pl='2' bg='pink.300' area={'nav'}>
        Nav
      </GridItem>
      <GridItem pl='2' bg='green.300' area={'main'} >
        Main
      </GridItem>
      <GridItem pl='2' bg='blue.300' area={'footer'}>
        Footer
      </GridItem>
    </Grid>
  )
}

export default HomePage