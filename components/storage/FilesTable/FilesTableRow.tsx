import { HStack, Image, Tr, Td, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import FileMenu from "./FileMenu";

import { File } from "utils/types";
import axios from "axios";
import { saveAs } from "file-saver";

const FilesTableRow: React.FC<File> = ({ name, lastEdited, path }) => {
  const [_, ext] = name.split(/\.(?=[^\.]+$)/);
  console.log(`File name: ${name}, File path: ${path}`);

  const downloadFile = async () => {
    const blob = await axios.get(`/api/storage/file/${path}`, {
      responseType: "blob",
    });
    saveAs(blob.data, name);
  };

  return (
    <Tr>
      <Td>
        <HStack spacing={4}>
          <Image
            src={ext ? `/icons/${ext}.svg` : "/icons/folder.svg"}
            alt="File extansion"
            boxSize="30px"
          />
          {ext ? (
            <Link isTruncated onClick={downloadFile}>
              {name}
            </Link>
          ) : (
            <NextLink href={`/storage/files/${path}`}>
              <Link isTruncated>{name}</Link>
            </NextLink>
          )}
        </HStack>
      </Td>
      <Td>{lastEdited}</Td>
      <Td>Only you</Td>
      <Td>
        <FileMenu />
      </Td>
    </Tr>
  );
};

export default FilesTableRow;
