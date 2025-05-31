import { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const InvoiceTable = ({ invoices }) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>Invoice List</TableCaption>
        <Thead>
          <Tr>
            <Th>Company</Th>
            <Th>Invoice ID</Th>
            <Th isNumeric>Subtotal</Th>
            <Th isNumeric>Shipping</Th>
            <Th isNumeric>Tax</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {invoices.map((invoice) => (
            <Tr key={invoice._id}>
              <Td>{invoice.company}</Td>
              <Td>{invoice.id}</Td>
              <Td isNumeric>{invoice.subtotal}</Td>
              <Td isNumeric>{invoice.shipping}</Td>
              <Td isNumeric>{invoice.tax}</Td>
              <Td isNumeric>{invoice.total}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Company</Th>
            <Th>Invoice ID</Th>
            <Th isNumeric>Subtotal</Th>
            <Th isNumeric>Shipping</Th>
            <Th isNumeric>Tax</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
    )
}

export default InvoiceTable