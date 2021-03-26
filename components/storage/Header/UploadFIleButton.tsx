import { Button, useToast } from "@chakra-ui/react";

import { useRef } from "react";
import axios from "axios";

interface Props {
  mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>;
  folderApiPrefix: string;
}

const FileInput: React.FC<Props> = ({ mutate, folderApiPrefix }) => {
  const toast = useToast();
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

      const response = await axios.post(
        `/api/storage/file${folderApiPrefix}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast({
          title: "File uploaded successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "File upload error",
          description: response.data,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      mutate();
    }
  };

  return (
    <>
      <Button size="lg" colorScheme="teal" onClick={onButtonClick}>
        Upload
      </Button>
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
