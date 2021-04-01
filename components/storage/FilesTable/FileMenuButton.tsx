import { MenuButton, IconButton, Icon } from "@chakra-ui/react";

const FileMenuButton: React.FC = () => {
  return (
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
  );
};

export default FileMenuButton;
