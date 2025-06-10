import { Button, Center, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import { useInvoiceStore } from "../store/invoice"
import React, { useState } from 'react'

const NavBar = () => {
  const setFilter = useInvoiceStore(state => state.setFilter);

  const [newInvoice, setNewInvoice] = useState({
    company: "",
    id: "",
    subtotal: "",
    shipping: "",
    tax: "",
    total: ""
  });

  const toast = useToast();

  const { createInvoice } = useInvoiceStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddInvoice = async () => {
    const { success, message } = await createInvoice(newInvoice);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error", 
        isClosable: true
      })
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success", 
        isClosable: true
      })
    }

    setNewInvoice({ company: "", id: "", subtotal: "", shipping: "", tax: "", total: "" })
  }

  return (
    <VStack>
      <Button
        size='md'
        height='48px'
        width='200px'
        border='2px'
        borderColor='green.500' 
        onClick={() => onOpen()}>
          New Invoice
      </Button>
      <Button
        size='md'
        height='48px'
        width='200px'
        border='2px'
        borderColor='green.500' 
        onClick={() => setFilter("all")}>
          All Invoices
      </Button>
      <Button
        size='md'
        height='48px'
        width='200px'
        border='2px'
        borderColor='green.500' 
        onClick={() => setFilter("starred")}>
          Starred
      </Button>
      <Button
        size='md'
        height='48px'
        width='200px'
        border='2px'
        borderColor='green.500' 
        onClick={() => setFilter("archived")}>
          Archived
      </Button>
      <Button
        size='md'
        height='48px'
        width='200px'
        border='2px'
        borderColor='green.500' 
        onClick={() => setFilter("trashed")}>
          Trash
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>New Invoice</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <VStack spacing={4}>
                      <Input
                          placeholder='Company'
                          name='company'
                          value={newInvoice?.company || ""}
                          onChange={(e) => setNewInvoice({ ...newInvoice, company: e.target.value }) }
                                
                      />
                      <Input
                          placeholder='Invoice ID'
                          name='id'
                          value={newInvoice?.id || ""}
                          onChange={(e) => setNewInvoice({ ...newInvoice, id: e.target.value }) }
                      />
                      <Input
                          placeholder='Subtotal'
                          name='subtotal'
                          type='number'
                          value={newInvoice?.subtotal || ""}
                          onChange={(e) => setNewInvoice({ ...newInvoice, subtotal: e.target.value }) }
                      />
                      <Input
                          placeholder='Shipping Fee'
                          name='shipping'
                          type='number'
                          value={newInvoice?.shipping || ""}
                          onChange={(e) => setNewInvoice({ ...newInvoice, shipping: e.target.value }) }
                      />
                      <Input
                          placeholder='Tax'
                          name='tax'
                          type='number'
                          value={newInvoice?.tax || ""}
                          onChange={(e) => setNewInvoice({ ...newInvoice, tax: e.target.value }) }
                      />
                      <Input
                          placeholder='Total'
                          name='total'
                          type='number'
                          value={newInvoice?.total || ""}
                          onChange={(e) => setNewInvoice({ ...newInvoice, total: e.target.value }) }
                      />
                  </VStack>
              </ModalBody>

              <ModalFooter>
                  <Button
                      onClick={() => handleAddInvoice()}
                  >
                      Add
                  </Button>
                  <Button
                      variant={'ghost'} onClick={onClose}
                  >Cancel</Button>
              </ModalFooter>
          </ModalContent>
      </Modal>
    </VStack>
  )
}

export default NavBar