import {
  Button,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
} from "@chakra-ui/react";
import InputField from "components/common/InputField";

import { useForm } from "react-hook-form";
import { useFolder } from "contexts/folder";
import responseToast from "helpers/responseToast";

interface Props {
  path: string;
  name: string;
  ext: string;
  isOpen: boolean;
  onClose: () => void;
}

const RenameFileModal: React.FC<Props> = ({
  path,
  name,
  ext,
  isOpen,
  onClose,
}) => {
  const { register, handleSubmit, formState } = useForm<{
    newName: string;
  }>();
  const { mutate, renameFileReq } = useFolder();

  const handleRename = async (newName: string) => {
    const res = await renameFileReq(path, name, ext, newName);
    onClose();
    responseToast(res.status, `File "${name}" renamed to "${newName}"`);
    mutate();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`Rename "${name}"`}</ModalHeader>
        <ModalCloseButton />
        <Box
          as="form"
          onSubmit={handleSubmit(({ newName }) => handleRename(newName))}
        >
          <ModalBody>
            <InputField
              id="new-name"
              name="newName"
              label="New name"
              size="lg"
              register={register}
              required="Please specify a new name"
              autoFocus
              error={formState.errors.newName}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              type="submit"
              w="100%"
              isLoading={formState.isSubmitting}
            >
              Rename
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default RenameFileModal;
