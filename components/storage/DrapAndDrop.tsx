import { Box } from "@chakra-ui/react";
import { useState, useRef } from "react";

import React from "react";

interface Props {
  uploadFiles: (files: File[]) => void;
}

const DrapAndDrop: React.FC<Props> = ({ children, uploadFiles }) => {
  const [inDropZone, setInDropZone] = useState(false);
  const enterTarget = useRef<EventTarget | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    enterTarget.current = e.target;
    setInDropZone(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === enterTarget.current) setInDropZone(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { items = [] } = e.dataTransfer;

    const files = Array.from(items).map((item) => item.getAsFile());
    uploadFiles(files);

    e.dataTransfer.clearData();
    setInDropZone(false);
  };

  return (
    <Box
      w="100%"
      h="100%"
      borderWidth={1}
      borderRadius="8px"
      borderColor={inDropZone ? "blue.400" : "transparent"}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
    >
      {children}
    </Box>
  );
};

export default DrapAndDrop;
