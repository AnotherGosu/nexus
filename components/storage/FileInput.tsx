import React, { useRef } from "react";
import { Button } from "@chakra-ui/react";
import { uploadFile } from "utils/storage";

interface Props {
  currentFolderPath: string;
}

const FileInput: React.FC<Props> = ({ currentFolderPath }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(e.target.files)[0];
    uploadFile(file);
  };

  return (
    <>
      <Button onClick={onButtonClick}>Upload files</Button>
      <input
        type="file"
        id="file-input"
        multiple
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={onInputChange}
        onClick={(e) => {
          const element = e.target as HTMLInputElement;
          element.value = null;
        }}
      />
    </>
  );
};

export default FileInput;
