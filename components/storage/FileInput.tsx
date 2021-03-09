import React, { useRef } from "react";
import { Button } from "@chakra-ui/react";

interface Props {
  uploadFiles: (files: File[]) => void;
}

const FileInput: React.FC<Props> = ({ uploadFiles }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    uploadFiles(files);
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
