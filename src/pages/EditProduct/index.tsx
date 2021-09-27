import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import {
  Link as ChakraLink,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  useToast,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { AxiosResponse } from "axios";

import { ModalDelete } from "../../components/ModalDelete";
import { DeleteIcon } from "@chakra-ui/icons";

interface RouterParams {
  id: string;
}

interface Product {
  error: string;
  result: {
    id: string;
    name: string;
    price: string;
    description: string;
  };
}

interface DeleteProduct {
  id: string;
  name: string;
}

export function EditProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [deleteProduct, setDeleteProduct] = useState({} as DeleteProduct);

  const [isFetching, setIsFetching] = useState(false);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams<RouterParams>();
  const history = useHistory();

  useEffect(() => {
    const getProduct = async () => {
      const { data }: AxiosResponse<Product> = await api.get(`product/${id}`);

      if (data.error) {
        history.push("/");
      }
      setDeleteProduct({ id: data.result.id, name: data.result.name });
      setName(data.result.name);
      setPrice(data.result.price);
      setDescription(data.result.description);
    };
    getProduct();
  }, [id, history]);

  const onSuccess = () =>
    toast({
      title: "Edição realizada com sucesso!",
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

  const openModalDelete = (id: string, name: string) => {
    onOpen();
    setDeleteProduct({ id, name });
  };

  const editProduct = async () => {
    setIsFetching(true);
    if (name && price && description) {
      const product = {
        name,
        price,
        description,
      };

      const response = await api.put(`product/${id}`, product);
      if (response.status === 200) {
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
      <Header title="Editar Produto" />
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
          <NumberInput color="gray.900" value={price}>
            <NumberInputField
              bg="white.50"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
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
            onClick={() => editProduct()}
            isLoading={isFetching}
            loadingText="Editando"
            mr="10px"
          >
            Editar
          </Button>

          <Button
            bg="gray.900"
            _hover={{ bg: "gray.600" }}
            onClick={() =>
              openModalDelete(deleteProduct.id, deleteProduct.name)
            }
          >
            Excluir <DeleteIcon color="red.500" />
          </Button>
        </FormControl>
      </Flex>
      <ModalDelete product={deleteProduct} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
