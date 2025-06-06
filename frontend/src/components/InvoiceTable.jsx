import { Box, Button, Center, HStack, IconButton, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { FaRegStar, FaStar } from "react-icons/fa6";
import { RiInboxArchiveLine, RiInboxUnarchiveFill } from "react-icons/ri";

import React from 'react'

const InvoiceTable = ({ invoices }) => {
    const sumSubtotal = invoices.reduce((sum, inv) => sum + inv.subtotal, 0);
    const sumShipping = invoices.reduce((sum, inv) => sum + inv.shipping, 0);
    const sumTax = invoices.reduce((sum, inv) => sum + inv.tax, 0);
    const sumTotal = invoices.reduce((sum, inv) => sum + inv.total, 0);

    const companyColWidth = "20%"
    const invoiceColWidth = "10%"
    const subtotalColWidth = "10%"
    const shippingColWidth = "10%"
    const taxColWidth = "10%"
    const totalColWidth = "10%"
    const actionsColWidth = "15%"

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
                <Td width={companyColWidth}  whiteSpace="nowrap">{invoice.company}</Td>
                <Td width={invoiceColWidth}  whiteSpace="nowrap">{invoice.id}</Td>
                <Td width={subtotalColWidth} isNumeric whiteSpace="nowrap">${invoice.subtotal.toFixed(2)}</Td>
                <Td width={shippingColWidth} isNumeric whiteSpace="nowrap">${invoice.shipping.toFixed(2)}</Td>
                <Td width={taxColWidth}      isNumeric whiteSpace="nowrap"> ${invoice.tax.toFixed(2)}</Td>
                <Td width={totalColWidth}    isNumeric whiteSpace="nowrap"> ${invoice.total.toFixed(2)}</Td>
                <Td width={actionsColWidth} >
                    <Center>
                        <IconButton icon={<FaRegStar/>}></IconButton>
                        <IconButton icon={<RiInboxArchiveLine/>}></IconButton>
                        <IconButton icon={<EditIcon/>}></IconButton>
                        <IconButton icon={<DeleteIcon/>}></IconButton>
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
      </Box>
    );
  };
  
  export default InvoiceTable;