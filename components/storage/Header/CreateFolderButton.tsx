import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import InputField from "../../common/InputField";

import { useForm } from "react-hook-form";
import { useFolder } from "contexts/folder";

const CreateFolderButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, formState } = useForm<{
    folderName: string;
  }>();

  const { mutate, createFolderReq } = useFolder();
  const toast = useToast();

  const createFolder = async (folderName: string) => {
    const res = await createFolderReq(folderName);
    if (res.status === 200) {
      toast({
        description: `Folder "${folderName}" created.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        description: "Error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    mutate();
    onClose();
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
          <form
            onSubmit={handleSubmit(({ folderName }) =>
              createFolder(folderName)
            )}
          >
            <ModalBody>
              <InputField
                id="folder-name"
                name="folderName"
                label="Title"
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
                mr={3}
                type="submit"
                w="100%"
                isLoading={formState.isSubmitting}
              >
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateFolderButton;
