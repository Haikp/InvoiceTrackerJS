import { Box, Button, Center, HStack, IconButton, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { PiMoneyWavy, PiMoneyWavyFill } from "react-icons/pi";
import { FaRegStar, FaStar, FaFire } from "react-icons/fa6";
import { FaRegTrashAlt, FaTrashRestoreAlt } from "react-icons/fa";
import { RiInboxArchiveLine, RiInboxUnarchiveFill } from "react-icons/ri";
import { useInvoiceStore } from "../store/invoice"

import React, { useState } from 'react'
import { darkTheme } from './LayoutConfig';

const InvoiceTable = ({ invoices }) => {
    const [updatedInvoice, setUpdatedInvoice] = useState(null)

    const companyColWidth = "16%"
    const invoiceColWidth = "10%"
    const subtotalColWidth = "10%"
    const shippingColWidth = "10%"
    const taxColWidth = "10%"
    const totalColWidth = "15%"
    const actionsColWidth = "20%"

    const { deleteInvoice, updateInvoice, invoiceStatus, starInvoice, archiveInvoice, trashInvoice, filter } = useInvoiceStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteInvoice = async (id) => {
        const { success, message } = await deleteInvoice(id);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 2000,
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
                duration: 2000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const handleInvoicePaymentStatus = async (id) => {
        const { success, message } = await invoiceStatus(id);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const handleStarInvoice = async (id) => {
        const { success, message } = await starInvoice(id);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const handleArchiveInvoice = async (id) => {
        const { success, message } = await archiveInvoice(id);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const handleTrashInvoice = async (id) => {
        const { success, message } = await trashInvoice(id);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const visibleInvoices = invoices.filter(inv => {
        if (filter === "starred") return inv.starred && !inv.archived && !inv.trashed;
        if (filter === "archived") return inv.archived && !inv.trashed;
        if (filter === "trashed") return inv.trashed;
        // Default: show only active (not archived, not trashed)
        return !inv.archived && !inv.trashed;
    });

    const sumSubtotal = visibleInvoices.reduce((sum, inv) => sum + Number(inv?.subtotal ?? 0), 0);
    const sumShipping = visibleInvoices.reduce((sum, inv) => sum + Number(inv?.shipping ?? 0), 0);
    const sumTax = visibleInvoices.reduce((sum, inv) => sum + Number(inv?.tax ?? 0), 0);
    const sumTotal = visibleInvoices.reduce((sum, inv) => sum + Number(inv?.total ?? 0), 0);

    // Add this handler inside your component
    const handleFieldChange = (field, value) => {
        const newValues = { ...updatedInvoice, [field]: value };
        const subtotal = Number(newValues.subtotal) || 0;
        const shipping = Number(newValues.shipping) || 0;
        const tax = Number(newValues.tax) || 0;
        newValues.total = subtotal + shipping + tax;
        setUpdatedInvoice(newValues);
    };

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
                <TableCaption bg={darkTheme.background} textColor={darkTheme.textSecondary}>End of List</TableCaption>
                <Thead position="sticky" top={0} bg={darkTheme.tableHeader} zIndex={1}>
                    <Tr>
                        <Th textColor={darkTheme.textSecondary} width={companyColWidth}  >Company</Th>
                        <Th textColor={darkTheme.textSecondary} width={invoiceColWidth}  >Invoice ID</Th>
                        <Th textColor={darkTheme.textSecondary} width={subtotalColWidth} isNumeric>Subtotal</Th>
                        <Th textColor={darkTheme.textSecondary} width={shippingColWidth} isNumeric>Shipping</Th>
                        <Th textColor={darkTheme.textSecondary} width={taxColWidth} isNumeric>Tax</Th>
                        <Th textColor={darkTheme.textSecondary} width={totalColWidth} isNumeric>Total</Th>
                        <Th textColor={darkTheme.textSecondary} width={actionsColWidth}  ><Center>Actions</Center></Th>
                    </Tr>
                </Thead>
                <Tbody bg={darkTheme.tableContent} textColor={darkTheme.textPrimary}>
                    {visibleInvoices.slice().reverse().map((invoice) => (
                        <Tr key={invoice._id}
                            role="group"
                            bg={invoice.paid ? darkTheme.tablePaid : darkTheme.tableContent}
                            sx={{
                                transition: "background-color 0.2s ease",
                            }}
                            _hover={{
                                filter: "brightness(1.15)",
                                // transition: "filter 0.2s ease-in-out",
                            }}
                        >
                            <Td width={companyColWidth} whiteSpace="nowrap">{String(invoice.company)}</Td>
                            <Td width={invoiceColWidth} whiteSpace="nowrap">{String(invoice.id)}</Td>
                            <Td width={subtotalColWidth} isNumeric whiteSpace="nowrap">${Number(invoice.subtotal.toFixed(2))}</Td>
                            <Td width={shippingColWidth} isNumeric whiteSpace="nowrap">${Number(invoice.shipping.toFixed(2))}</Td>
                            <Td width={taxColWidth} isNumeric whiteSpace="nowrap"> ${Number(invoice.tax.toFixed(2))}</Td>
                            <Td width={totalColWidth} isNumeric whiteSpace="nowrap"> ${Number(invoice.total.toFixed(2))}</Td>
                            <Td width={actionsColWidth} >
                                <Center>
                                    {filter === "trashed" && (
                                        <>
                                            <IconButton icon={<FaTrashRestoreAlt />} onClick={() => handleTrashInvoice(invoice._id)}
                                                _groupHover={{
                                                    color: darkTheme.trashButton,
                                                }}
                                            />
                                            <IconButton icon={<FaFire />} onClick={() => handleDeleteInvoice(invoice._id)}
                                                _groupHover={{
                                                    color: darkTheme.deleteButton,
                                                }}
                                            />
                                        </>
                                    )}

                                    {filter !== "trashed" && (
                                        <>
                                            <IconButton icon={invoice.paid === false ? <PiMoneyWavy /> : <PiMoneyWavyFill />} onClick={() => handleInvoicePaymentStatus(invoice._id)}
                                                _groupHover={{
                                                    color: darkTheme.paidButton,
                                                }}
                                            />
                                            <IconButton icon={invoice.starred === false ? <FaRegStar /> : <FaStar />} onClick={() => handleStarInvoice(invoice._id)}
                                                _groupHover={{
                                                    color: darkTheme.starButton,
                                                }}
                                            />
                                            <IconButton icon={invoice.archived === false ? <RiInboxArchiveLine /> : <RiInboxUnarchiveFill />} onClick={() => handleArchiveInvoice(invoice._id)}
                                                _groupHover={{
                                                    color: darkTheme.archiveButton,
                                                }}
                                            />
                                            <IconButton icon={<EditIcon />} onClick={() => { setUpdatedInvoice(invoice); onOpen(); }}
                                                _groupHover={{
                                                    color: "white",
                                                }}
                                            />
                                            <IconButton icon={<FaRegTrashAlt />} onClick={() => handleTrashInvoice(invoice._id)}
                                                _groupHover={{
                                                    color: darkTheme.trashButton,
                                                }}
                                            />
                                        </>
                                    )}
                                </Center>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot position={"sticky"} bottom={0} bg={darkTheme.tableHeader} zIndex={1}>
                    <Tr>
                        <Th textColor={darkTheme.textSecondary} width={companyColWidth}  >Column Sums</Th>
                        <Th textColor={darkTheme.textSecondary} width={invoiceColWidth}  ></Th>
                        <Th textColor={darkTheme.textSecondary} width={subtotalColWidth} isNumeric whiteSpace="nowrap">${sumSubtotal.toFixed(2)}</Th>
                        <Th textColor={darkTheme.textSecondary} width={shippingColWidth} isNumeric whiteSpace="nowrap">${sumShipping.toFixed(2)}</Th>
                        <Th textColor={darkTheme.textSecondary} width={taxColWidth} isNumeric whiteSpace="nowrap">${sumTax.toFixed(2)}</Th>
                        <Th textColor={darkTheme.textSecondary} width={totalColWidth} isNumeric whiteSpace="nowrap">${sumTotal.toFixed(2)}</Th>
                        <Th textColor={darkTheme.textSecondary} width={actionsColWidth}  ><Center>Actions</Center></Th>
                    </Tr>
                </Tfoot>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent bg={darkTheme.surface} color={darkTheme.textPrimary}>
                    <ModalHeader>Update Invoice</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Company'
                                name='company'
                                value={updatedInvoice?.company || ""}
                                onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, company: e.target.value })}
                            />
                            <Input
                                placeholder='Invoice ID'
                                name='id'
                                value={updatedInvoice?.id || ""}
                                onChange={(e) => setUpdatedInvoice({ ...updatedInvoice, id: e.target.value })}
                            />
                            <InputGroup>
                                <InputLeftAddon children="$" />
                                <Input
                                    placeholder='Subtotal'
                                    name='subtotal'
                                    type='number'
                                    value={updatedInvoice?.subtotal || ""}
                                    onChange={(e) => handleFieldChange('subtotal', e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon children="$" />
                                <Input
                                    placeholder='Shipping Fee'
                                    name='shipping'
                                    type='number'
                                    value={updatedInvoice?.shipping || ""}
                                    onChange={(e) => handleFieldChange('shipping', e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon children="$" />
                                <Input
                                    placeholder='Tax'
                                    name='tax'
                                    type='number'
                                    value={updatedInvoice?.tax || ""}
                                    onChange={(e) => handleFieldChange('tax', e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon children="$" />
                                <Input
                                    placeholder='Total'
                                    name='total'
                                    type='number'
                                    value={(() => {
                                        const subtotal = Number(updatedInvoice?.subtotal) || 0;
                                        const shipping = Number(updatedInvoice?.shipping) || 0;
                                        const tax = Number(updatedInvoice?.tax) || 0;
                                        return (subtotal + shipping + tax).toFixed(2);
                                    })()}
                                    isReadOnly
                                />
                            </InputGroup>
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