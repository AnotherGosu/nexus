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
} from "@chakra-ui/react";
import InputField from "../../common/InputField";

import { useForm } from "react-hook-form";
import axios from "axios";

interface Props {
  mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
  folderApiPrefix: string;
}

const CreateFolderButton: React.FC<Props> = ({ mutate, folderApiPrefix }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, formState } = useForm<{
    folderName: string;
  }>();

  const createFolder = async (folderName: string) => {
    try {
      await axios.post(`/api/storage/folder${folderApiPrefix}`, { folderName });
    } catch (err) {
      console.log(err);
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
