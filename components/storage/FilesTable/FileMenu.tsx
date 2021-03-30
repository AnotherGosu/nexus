import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  IconButton,
  useToast,
} from "@chakra-ui/react";

import { useFolder } from "contexts/folder";

interface Props {
  path: string;
}

const FileMenu: React.FC<Props> = ({ path }) => {
  const { mutate, deleteFileReq } = useFolder();
  const toast = useToast();

  const handleRename = () => {
    mutate("/api/storage/folder");
  };

  const handleDelete = async () => {
    const res = await deleteFileReq(path);
    if (res.status === 200) {
      toast({
        title: "File deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    mutate();
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={
          <Icon
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
          </Icon>
        }
        size="xs"
        variant="fill"
      />
      <MenuList>
        <MenuItem onClick={handleRename}>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default FileMenu;
