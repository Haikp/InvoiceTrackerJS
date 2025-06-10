import { Button, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FaFileInvoiceDollar } from 'react-icons/fa6'
import { RiCustomerServiceFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const FuncBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex w={'100%'} h={"100vh"} direction={"column"}>
        <IconButton 
            variant={"solid"}
            icon={<FaFileInvoiceDollar/>}
            size={"lg"}
            bg={"teal"}
            borderRadius={"full"}
            >
                <Link to={"/"}/>
        </IconButton>
        <Spacer />
        <IconButton 
            icon={<RiCustomerServiceFill/>}
            size={"lg"}
            onClick={onOpen}
            >
        </IconButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>IT Support</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            If there are any bugs, or if there's a feature request you would like, just let me know, surely it won't take too long to implement. Someone there has my phone number or something.
            <br/>
            <br/>
            If there's another app you would like me to make, just know that it takes a while to get done.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default FuncBar