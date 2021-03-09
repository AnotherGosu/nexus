import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import AuthContent from "./AuthContent";

type Inputs = {
  email: string;
  password: string;
};

const AuthModal = ({ isOpen, onClose, type, onSubmit }) => {
  const { handleSubmit, register, formState } = useForm<Inputs>();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius={4}>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <AuthContent
              as="form"
              width="100%"
              py={8}
              formState={formState}
              onSubmit={handleSubmit((data) => onSubmit(data))}
              register={register}
              type={type}
            />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
