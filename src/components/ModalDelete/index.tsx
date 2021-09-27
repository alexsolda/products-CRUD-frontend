import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router";
import { api } from "../../services/api";

interface ModalEditProps {
  product: {
    id: string;
    name: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDelete = ({ product, isOpen, onClose }: ModalEditProps) => {
  const history = useHistory();

  const deleteProduct = async () => {
    await api.delete(`product/${product.id}`);
    onClose();
    history.push("/");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.50">
        <ModalHeader bg="gray.900">Excluir produto</ModalHeader>
        <ModalCloseButton />
        <ModalBody color="gray.600">
          <p>Tem certeza de que deseja excluir o produto: </p>
          <strong>{product.name}</strong>?
        </ModalBody>

        <ModalFooter>
          <Button bg="red.500" onClick={() => deleteProduct()}>
            Excluir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
