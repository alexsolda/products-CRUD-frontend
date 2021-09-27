import { EditIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useSWR from "swr";

import { api } from "../../services/api";
import { dateFormatter } from "../../utils/dateFormatter";
import { formatPrice } from "../../utils/priceFormatter";

interface ProductsData {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
}



export function TableData() {
  const [products, setProducts] = useState<ProductsData[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const { data } = useSWR("products", (url) => api.get(url));

  useEffect(() => {
    setProducts(data?.data);
    setIsFetching(false);
  }, [data]);

 

  return (
    <>
      <Table
        variant="striped"
        maxW="1440px"
        m="0 auto"
        colorScheme="blackAlpha"
        color="gray.600"
      >
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th isNumeric>Preço</Th>
            <Th>Data de criação</Th>
            <Th>Editar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map((product) => (
            <Tr key={product.id}>
              <Td>{product.id}</Td>
              <Td>{product.name}</Td>
              <Td>{product.description}</Td>
              <Td isNumeric>{formatPrice(product.price)}</Td>
              <Td>{dateFormatter(product.created_at)}</Td>
              <Td>
                <Button
                  as={Link}
                  to={`/edit-product/${product.id}`}
                  bg="gray.900"
                  mr="10px"
                  _hover={{ bg: "gray.600" }}
                >
                  <EditIcon color="yellow.500" />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isFetching && (
        <Flex
          alignItems="center"
          justifyContent="center"
          color="gray.900"
          h="300px"
          w="100%"
        >
          <Spinner />
        </Flex>
      )}
    </>
  );
}
