import { useState } from "react";

import {
  Link as ChakraLink,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  useToast,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { api } from "../../services/api";

export function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [isFetching, setIsFetching] = useState(false);

  const toast = useToast();

  const onSuccess = () =>
    toast({
      title: "Produto inserido com sucesso!",
      status: "success",
      isClosable: true,
      duration: 3000,
      position: "top",
    });
  const onFailure = () =>
    toast({
      title: "Algo deu errado.",
      description: "Verifique todos os campos e tente novamente!",
      status: "error",
      isClosable: true,
      duration: 3000,
      position: "top",
    });

  const addNewProduct = async () => {
    setIsFetching(true);
    if (name && price && description) {
      const product = {
        name,
        price,
        description,
      };

      const response = await api.post("product", product);
      if (response.status === 200) {
        setName("");
        setPrice(" ");
        setDescription("");
        onSuccess();
      } else {
        onFailure();
      }
    } else {
      onFailure();
    }

    setIsFetching(false);
  };

  return (
    <>
      <Header title="Novo Produto" />
      <Flex maxW="1440px" m="0 auto" flexDirection="column">
        <ChakraLink
          as={Link}
          to="/"
          mb="60px"
          color="gray.600"
          _hover={{ textDecoration: "underline" }}
        >
          voltar
        </ChakraLink>
        <FormControl w={["100%", "50%"]}>
          <FormLabel color="gray.900">Nome:</FormLabel>
          <Input
            color="gray.900"
            bg="white.50"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <br />
          <FormLabel color="gray.900">Preço:</FormLabel>
          <NumberInput color="gray.900" defaultValue={0.00} value={price} precision={2} step={0.1}>
            <NumberInputField
              bg="white.50"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
         
          </NumberInput>
          <br />
          <br />
          <FormLabel color="gray.900">Descrição:</FormLabel>
          <Textarea
            color="gray.900"
            bg="white.50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br />
          <br />
          <Button
            bg="gray.600"
            color="white.50"
            _hover={{ bg: "gray.900" }}
            onClick={() => addNewProduct()}
            isLoading={isFetching}
            loadingText="Adicionando"
          >
            Adicionar
          </Button>
        </FormControl>
      </Flex>
    </>
  );
}
