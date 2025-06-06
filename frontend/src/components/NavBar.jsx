import { Button, Center, VStack } from '@chakra-ui/react'
import React from 'react'

const NavBar = () => {
  return (
    <VStack>
        <Button>New Invoice</Button>
        <Button>All Invoices</Button>
        <Button>Starred</Button>
        <Button>Archived</Button>
        <Button>Trash</Button>
    </VStack>
  )
}

export default NavBar