import { HStack, Image, Tr, Td, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import FileMenu from "./FileMenu";

import { useFolder } from "contexts/folder";
import { saveAs } from "file-saver";
import { File } from "utils/types";

const FilesTableRow: React.FC<File> = ({ name, lastEdited, path }) => {
  const [_, ext] = name.split(/\.(?=[^\.]+$)/);

  const { downloadFileReq } = useFolder();

  const downloadFile = async () => {
    const blob = await downloadFileReq(path);
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
        <FileMenu path={path} />
      </Td>
    </Tr>
  );
};

export default FilesTableRow;
