import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { RiCustomerServiceFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { darkTheme, gridCol1, gridRow1 } from "./LayoutConfig.jsx"; // adjust the path if needed

const FuncBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selected, setSelected] = useState("invoice");

  const defaultBg = darkTheme.surface;
  const hoverBg = darkTheme.buttonHover;
  const selectedBg = darkTheme.buttonSelected;

  return (
    <Flex w={"100%"} h={"100vh"} direction={"column"}>
      <IconButton
        icon={<FaFileInvoiceDollar />}
        w={gridCol1}
        h={gridRow1}
        borderRadius={"none"}
        as={Link}
        to="/"
        bg={selected === "invoice" ? selectedBg : defaultBg}
        _hover={selected === "invoice" ? {} : { bg: hoverBg }}
        onClick={() => setSelected("invoice")}
        aria-label="Invoices"
      />

      <Spacer />

      <IconButton
        icon={<RiCustomerServiceFill />}
        w={gridCol1}
        h={gridRow1}
        borderRadius={"none"}
        bg={defaultBg}
        _hover={{ bg: hoverBg }}
        onClick={onOpen}
        aria-label="IT Support"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={darkTheme.surface} color={darkTheme.textPrimary}>
          <ModalHeader>IT Support</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            If there are any bugs, or if there's a feature request you would like,
            just let me know, surely it won't take too long to implement. Someone
            there has my phone number surely.
            <br />
            <br />
            If there's another app you would like me to make, just know that it
            takes a while to get done. Probably won't take as long as the Invoice Tracker,
            but will take some time.
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default FuncBar;
