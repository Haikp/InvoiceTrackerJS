import { Box, Button, Center, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { FaRegStar, FaStar } from "react-icons/fa6";
import { RiInboxArchiveLine, RiInboxUnarchiveFill } from "react-icons/ri";
import { useInvoiceStore } from "../store/invoice"

import React, { useState } from 'react'

const InvoiceTable = ({ invoices }) => {
    const [ updatedInvoice, setUpdatedInvoice ] = useState(null)

    const sumSubtotal = invoices.reduce((sum, inv) => sum + Number(inv?.subtotal ?? 0), 0);
    const sumShipping = invoices.reduce((sum, inv) => sum + Number(inv?.shipping ?? 0), 0);
    const sumTax = invoices.reduce((sum, inv) => sum + Number(inv?.tax ?? 0), 0);
    const sumTotal = invoices.reduce((sum, inv) => sum + Number(inv?.total ?? 0), 0);
    

    const companyColWidth = "20%"
    const invoiceColWidth = "10%"
    const subtotalColWidth = "10%"
    const shippingColWidth = "10%"
    const taxColWidth = "10%"
    const totalColWidth = "10%"
    const actionsColWidth = "15%"

    const { deleteInvoice, updateInvoice } = useInvoiceStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteInvoice = async (id) => {
        const { success, message } = await deleteInvoice(id);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleUpdateInvoice = async (id, updatedInvoice) => {
        const { success, message } = await updateInvoice(id, updatedInvoice)
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            })
        }
    }

    return (
      <Box maxHeight="100%" overflowY="auto" borderWidth="1px" borderRadius="md" sx={{
        /* For Chrome, Safari, Edge */
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        /* For Firefox */
        scrollbarWidth: 'none',
        /* For IE/Edge */
        msOverflowStyle: 'none',
      }}>
        <Table size="sm" variant="simple" style={{ tableLayout: 'fixed', width: '100%' }}>
          <TableCaption>End of List</TableCaption>
          <Thead position="sticky" top={0} bg="white" zIndex={1}>
            <Tr>
              <Th width={companyColWidth}  >Company</Th>
              <Th width={invoiceColWidth}  >Invoice ID</Th>
              <Th width={subtotalColWidth} isNumeric>Subtotal</Th>
              <Th width={shippingColWidth} isNumeric>Shipping</Th>
              <Th width={taxColWidth}      isNumeric>Tax</Th>
              <Th width={totalColWidth}    isNumeric>Total</Th>
              <Th width={actionsColWidth}  ><Center>Actions</Center></Th>
            </Tr>
          </Thead>
          <Tbody>
            {invoices.slice().reverse().map((invoice) => (
              <Tr key={invoice._id}>
                <Td width={companyColWidth}  whiteSpace="nowrap">{String(invoice.company)}</Td>
                <Td width={invoiceColWidth}  whiteSpace="nowrap">{String(invoice.id)}</Td>
                <Td width={subtotalColWidth} isNumeric whiteSpace="nowrap">${Number(invoice.subtotal.toFixed(2))}</Td>
                <Td width={shippingColWidth} isNumeric whiteSpace="nowrap">${Number(invoice.shipping.toFixed(2))}</Td>
                <Td width={taxColWidth}      isNumeric whiteSpace="nowrap"> ${Number(invoice.tax.toFixed(2))}</Td>
                <Td width={totalColWidth}    isNumeric whiteSpace="nowrap"> ${Number(invoice.total.toFixed(2))}</Td>
                <Td width={actionsColWidth} >
                    <Center>
                        <IconButton icon={ invoice.starred === false ? <FaRegStar/> : <FaStar/> }/>
                        <IconButton icon={ invoice.archived === false ? <RiInboxArchiveLine/> : <RiInboxUnarchiveFill/> }>
                        </IconButton>
                        <IconButton icon={<EditIcon/>} onClick={() => {setUpdatedInvoice(invoice); onOpen();}}/>
                        <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteInvoice(invoice._id)}/>
                    </Center>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot position={"sticky"} bottom={0} bg={"white"} zIndex={1}>
            <Tr>
              <Th width={companyColWidth}  >Column Sums</Th>
              <Th width={invoiceColWidth}  ></Th>
              <Th width={subtotalColWidth} isNumeric whiteSpace="nowrap">${sumSubtotal.toFixed(2)}</Th>
              <Th width={shippingColWidth} isNumeric whiteSpace="nowrap">${sumShipping.toFixed(2)}</Th>
              <Th width={taxColWidth}      isNumeric whiteSpace="nowrap">${sumTax.toFixed(2)}</Th>
              <Th width={totalColWidth}    isNumeric whiteSpace="nowrap">${sumTotal.toFixed(2)}</Th>
              <Th width={actionsColWidth}  ><Center>Actions</Center></Th>
            </Tr>
          </Tfoot>
        </Table>
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Invoice</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input
                            placeholder='Company'
                            name='company'
                            value={updatedInvoice?.company || ""}
                            onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, company: e.target.value }) }
                                
                        />
                        <Input
                            placeholder='Invoice ID'
                            name='id'
                            value={updatedInvoice?.id || ""}
                            onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, id: e.target.value }) }
                        />
                        <Input
                            placeholder='Subtotal'
                            name='subtotal'
                            type='number'
                            value={updatedInvoice?.subtotal || ""}
                            onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, subtotal: e.target.value }) }
                        />
                        <Input
                            placeholder='Shipping Fee'
                            name='shipping'
                            type='number'
                            value={updatedInvoice?.shipping || ""}
                            onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, shipping: e.target.value }) }
                        />
                        <Input
                            placeholder='Tax'
                            name='tax'
                            type='number'
                            value={updatedInvoice?.tax || ""}
                            onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, tax: e.target.value }) }
                        />
                        <Input
                            placeholder='Total'
                            name='total'
                            type='number'
                            value={updatedInvoice?.total || ""}
                            onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, total: e.target.value }) }
                        />
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        onClick={() => handleUpdateInvoice(updatedInvoice._id, updatedInvoice)}
                    >
                        Update
                    </Button>
                    <Button
                        variant={'ghost'} onClick={onClose}
                    >Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
      </Box>
    );
  };
  
  export default InvoiceTable;