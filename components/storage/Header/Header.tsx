import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import CreateFolderButton from "./CreateFolderButton";
import UploadFileButton from "./UploadFIleButton";

interface Props {
  mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
  folderApiPrefix: string;
}

const Header: React.FC<Props> = ({ mutate, folderApiPrefix }) => {
  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      p={4}
      gridColumnGap="100px"
    >
      <InputGroup size="lg">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.500" />}
        />
        <Input placeholder="Search files, folders" variant="filled" />
      </InputGroup>
      <ButtonGroup spacing={4}>
        <CreateFolderButton mutate={mutate} folderApiPrefix={folderApiPrefix} />
        <UploadFileButton mutate={mutate} folderApiPrefix={folderApiPrefix} />
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
