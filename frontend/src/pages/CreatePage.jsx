import { Box, Button, Container, Heading, Input, VStack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useInvoiceStore } from "../store/invoice";

const CreatePage = () => {
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
    <Container maxW={"container.sm"}>
      <VStack
      spacing={"8"}
      >
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={"8"}>
          Create New Invoice
        </Heading>

        <Box
          w={"full"} 
          bg={useColorModeValue("white", "gray.800")}
          p={"6"} 
          rounded={"lg"} 
          shadow={"md"}
        >
          <VStack spacing={"4"}>
            <Input 
              placeholder="Company Name"
              name="Company"
              value={newInvoice.company}
              onChange={(e) => setNewInvoice({ ...newInvoice, company: e.target.value })}
            />
            <Input 
              placeholder="Invoice ID"
              name="ID"
              value={newInvoice.id}
              onChange={(e) => setNewInvoice({ ...newInvoice, id: e.target.value })}
            />
            <Input 
              placeholder="Subtotal"
              name="Subtotal"
              value={newInvoice.subtotal}
              onChange={(e) => setNewInvoice({ ...newInvoice, subtotal: e.target.value })}
            />
            <Input 
              placeholder="Shipping Fee"
              name="Shipping"
              value={newInvoice.shipping}
              onChange={(e) => setNewInvoice({ ...newInvoice, shipping: e.target.value })}
            />
            <Input 
              placeholder="Tax"
              name="Tax"
              value={newInvoice.tax}
              onChange={(e) => setNewInvoice({ ...newInvoice, tax: e.target.value })}
            />
            <Input 
              placeholder="Total"
              name="Total"
              value={newInvoice.total}
              onChange={(e) => setNewInvoice({ ...newInvoice, total: e.target.value })}
            />
            <Button colorScheme="blue" onClick={handleAddInvoice} w="full">
              Add Invoice
            </Button>
          </VStack>

        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage