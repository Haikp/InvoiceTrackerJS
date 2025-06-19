import { Box, Button, Container, Flex, HStack, Input, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInvoiceStore } from "../store/invoice";
import { debounce } from 'lodash'

import { PlusSquareIcon } from "@chakra-ui/icons"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { darkTheme, searchBarHeight } from './LayoutConfig'

const SearchBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { searchInvoices, fetchInvoices } = useInvoiceStore();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Debounced search function - runs 300ms after user stops typing
  const debouncedSearch = React.useMemo(() => {
    return debounce(async (q) => {
      if (q.trim().length === 0) {
        // If empty query, fetch all invoices and set results
        const allInvoices = await fetchInvoices();
        setResults(allInvoices);
        return;
      }
      // Otherwise, search filtered invoices
      const { success, message } = await searchInvoices(q);
      if (success) setResults(message);
    }, 300);
  }, [searchInvoices, fetchInvoices]);

  // useEffect to trigger search when query changes
  useEffect(() => {
    debouncedSearch(query);

    // Cleanup to cancel debounce on unmount or query change
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  return (
    <Container maxW={"100%"} px={"0"}>
      <Flex
        h={searchBarHeight}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Box w={"50%"} bg={darkTheme.searchBarColor} borderRadius={"md"}>
          <Input
            placeholder="Search Company Name or Invoice ID..."
            name="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            color={darkTheme.textPrimary}
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default SearchBar;
