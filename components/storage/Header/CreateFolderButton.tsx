import {
  Button,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import InputField from "../../common/InputField";

import { useForm } from "react-hook-form";
import { useFolder } from "contexts/folder";
import responseToast from "helpers/responseToast";

const CreateFolderButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, formState } = useForm<{
    folderName: string;
  }>();

  const { mutate, createFolderReq } = useFolder();

  const createFolder = async (folderName: string) => {
    const res = await createFolderReq(folderName);
    onClose();
    responseToast(res.status, `Folder "${folderName}" created.`);
    mutate();
  };

  return (
    <>
      <Button size="lg" color="blue.500" onClick={onOpen}>
        Create
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create folder</ModalHeader>
          <ModalCloseButton />
          <Box
            as="form"
            onSubmit={handleSubmit(({ folderName }) =>
              createFolder(folderName)
            )}
          >
            <ModalBody>
              <InputField
                id="folder-name"
                name="folderName"
                label="Folder name"
                size="lg"
                register={register}
                required="Please specify folder name"
                autoFocus
                error={formState.errors.folderName}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                type="submit"
                w="100%"
                isLoading={formState.isSubmitting}
              >
                Create
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateFolderButton;
