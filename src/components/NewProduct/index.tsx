import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import { Link } from "react-router-dom";

export function NewProduct() {
  return (
    <Box w="100%" pl="10px" pr="10px">
      <Flex
        maxW="1440px"
        m="0 auto"
        mb="40px"
        pt="10px"
        pb="10px"
        justifyContent="flex-end"
      >
        <Button
          bg="gray.900"
          _hover={{ bg: "gray.600" }}
          as={Link}
          to="/add-product"
        >
          Novo Produto
        </Button>
      </Flex>
    </Box>
  );
}
