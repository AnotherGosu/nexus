import { Button, useToast } from "@chakra-ui/react";

import { useRef } from "react";
import { useFolder } from "contexts/folder";
import responseToast from "helpers/responseToast";

const UploadFilesButton: React.FC = () => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate, uploadFilesReq } = useFolder();

  const onButtonClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files);

    if (files.length) {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files[]", file, file.name);
        toast({
          description: `Uploading "${file.name}"`,
          status: "info",
          duration: null,
        });
      });

      const res = await uploadFilesReq(formData);
      toast.closeAll();

      if (res.status === 200) {
        const { uploadedFiles } = res.data;
        uploadedFiles.forEach((file) =>
          toast({
            title: `Uploaded ${file}`,
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        );
      } else {
        toast({
          description: "Error occurred.",
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

export default UploadFilesButton;
