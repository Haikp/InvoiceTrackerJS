import { Container, Flex, Grid, GridItem, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useInvoiceStore } from '../store/invoice'
import SearchBar from '../components/SearchBar'
import { gridColumnSizes, gridRowSizes, searchBarHeight, darkTheme } from '../components/LayoutConfig'
import InvoiceTable from '../components/InvoiceTable'
import NavBar from '../components/NavBar'
import FuncBar from '../components/FuncBar'

const HomePage = () => {
  const { fetchInvoices, invoices } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);
  console.log("invoices", invoices);

  return (
    <Grid
      templateAreas={`"func home search"
                      "func nav main"
                      "func nav main"`}
      gridTemplateRows={gridRowSizes}
      gridTemplateColumns={gridColumnSizes}
      h='100vh'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem bg={darkTheme.surface} area={'func'}>
        <FuncBar/>
      </GridItem>
      <GridItem pl='2' bg={darkTheme.surface} area={'home'}>
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
      <GridItem pl='0' bg={darkTheme.surface} area={'search'}>
        <SearchBar />
      </GridItem>
      <GridItem bg={darkTheme.surface} area={'nav'}>
        <NavBar></NavBar>
      </GridItem>
      <GridItem pl='0' bg={darkTheme.surface} area={'main'} overflowY="auto" >
        <InvoiceTable invoices={invoices} />
      </GridItem>
    </Grid>
  )
}

export default HomePage