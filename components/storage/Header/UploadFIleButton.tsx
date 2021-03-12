import React, { useRef } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { uploadFiles } from "utils/storage";

interface Props {}

const FileInput: React.FC<Props> = ({}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files[]", file, file.name);
      });

      const response = await axios.post("/api/storage/file", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
    }
  };

  return (
    <>
      <Button onClick={onButtonClick}>Upload</Button>
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
