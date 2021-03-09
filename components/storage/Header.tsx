import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import CreateFolderButton from "./CreateFolderButton";

interface Props {
  mutate: any;
}

const Header: React.FC<Props> = ({ mutate }) => {
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
        <CreateFolderButton mutate={mutate} />
        <Button size="lg" colorScheme="teal">
          Upload
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
