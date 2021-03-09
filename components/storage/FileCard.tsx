import React from "react";
import { Heading, Image, VStack } from "@chakra-ui/react";

interface Props {
  fileName: string;
}

const FileCard: React.FC<Props> = ({ fileName }) => {
  const [name, ext] = fileName.split(/\.(?=[^\.]+$)/);

  return (
    <VStack
      as="article"
      spacing={4}
      p={6}
      justify="center"
      borderRadius={8}
      borderWidth={1}
      boxShadow="md"
    >
      <Image src={`/icons/${ext}.svg`} alt={ext} boxSize="50px" />
      <Heading fontSize={16} fontWeight="medium" textAlign="center">
        {name}
      </Heading>
    </VStack>
  );
};

export default FileCard;
