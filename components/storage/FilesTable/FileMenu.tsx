import { Menu, MenuList, MenuItem, useDisclosure } from "@chakra-ui/react";
import FileMenuButton from "./FileMenuButton";
import RenameFileModal from "./RenameFileModal";

import { useFolder } from "contexts/folder";
import responseToast from "helpers/responseToast";

interface Props {
  path: string;
  name: string;
  ext: string;
}

const FileMenu: React.FC<Props> = ({ path, name, ext }) => {
  const { mutate, deleteFileReq, copyFileReq } = useFolder();
  const {
    onOpen: onRenameModalOpen,
    onClose: onRenameModalClose,
    isOpen: isRenameModalOpen,
  } = useDisclosure();

  const handleMove = () => {};

  const handleCopy = async () => {
    const res = await copyFileReq(path, name, ext);
    responseToast(res.status, `File "${name}" copied.`);
    mutate();
  };

  const handleDelete = async () => {
    const res = await deleteFileReq(path);
    responseToast(res.status, `File "${name}" deleted.`);
    mutate();
  };

  return (
    <Menu>
      <FileMenuButton />
      <MenuList>
        <MenuItem onClick={onRenameModalOpen}>Rename</MenuItem>
        <MenuItem onClick={handleMove}>Move</MenuItem>
        <MenuItem onClick={handleCopy}>Copy</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </MenuList>
      <RenameFileModal
        path={path}
        name={name}
        ext={ext}
        isOpen={isRenameModalOpen}
        onClose={onRenameModalClose}
      />
    </Menu>
  );
};

export default FileMenu;
