import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useInvoiceStore } from "../store/invoice";
import { darkTheme, navWidth } from "./LayoutConfig.jsx";

const NavBar = () => {
  const setFilter = useInvoiceStore((state) => state.setFilter);
  const { createInvoice } = useInvoiceStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedFilter, setSelectedFilter] = useState("all");

  const [newInvoice, setNewInvoice] = useState({
    company: "",
    id: "",
    subtotal: "",
    shipping: "",
    tax: "",
    total: "",
  });

  const handleAddInvoice = async () => {
    const { success, message } = await createInvoice(newInvoice);
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
    });
    setNewInvoice({
      company: "",
      id: "",
      subtotal: "",
      shipping: "",
      tax: "",
      total: "",
    });
  };

  const filters = [
    { label: "New Invoice", action: onOpen, id: "new" },
    { label: "All Invoices", action: () => setFilter("all"), id: "all" },
    { label: "Starred", action: () => setFilter("starred"), id: "starred" },
    { label: "Archived", action: () => setFilter("archived"), id: "archived" },
    { label: "Trash", action: () => setFilter("trashed"), id: "trashed" },
  ];

  return (
    <VStack spacing={0}>
      {filters.map(({ label, action, id }) => {
        const isSelectable = id !== "new";
        const isSelected = selectedFilter === id;

        return (
          <Button
            key={id}
            onClick={() => {
              action();
              if (isSelectable) setSelectedFilter(id);
            }}
            size="md"
            height="40px"
            width={navWidth}
            bg={isSelectable && isSelected ? darkTheme.buttonSelected : darkTheme.surface}
            color={darkTheme.textPrimary}
            _hover={
              isSelectable && isSelected
                ? {}
                : { bg: darkTheme.buttonHover }
            }
            borderRadius={0}
          >
            {label}
          </Button>
        );
      })}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={darkTheme.surface} color={darkTheme.textPrimary}>
          <ModalHeader>New Invoice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Company"
                name="company"
                value={newInvoice.company}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, company: e.target.value })
                }
              />
              <Input
                placeholder="Invoice ID"
                name="id"
                value={newInvoice.id}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, id: e.target.value })
                }
              />
              <Input
                placeholder="Subtotal"
                name="subtotal"
                type="number"
                value={newInvoice.subtotal}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, subtotal: e.target.value })
                }
              />
              <Input
                placeholder="Shipping Fee"
                name="shipping"
                type="number"
                value={newInvoice.shipping}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, shipping: e.target.value })
                }
              />
              <Input
                placeholder="Tax"
                name="tax"
                type="number"
                value={newInvoice.tax}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, tax: e.target.value })
                }
              />
              <Input
                placeholder="Total"
                name="total"
                type="number"
                value={newInvoice.total}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, total: e.target.value })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => { handleAddInvoice(); onClose(); }}>
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default NavBar;
