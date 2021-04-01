import { HStack, Image, Tr, Td, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import FileMenu from "./FileMenu";

import { useFolder } from "contexts/folder";
import { saveAs } from "file-saver";
import { File } from "utils/types";

const FilesTableRow: React.FC<File> = ({ name, ext, lastEdited, path }) => {
  const { downloadFileReq } = useFolder();

  const downloadFile = async () => {
    const blob = await downloadFileReq(path);
    saveAs(blob.data, name);
  };

  //consider that folder extension is "/"
  return (
    <Tr>
      <Td>
        <HStack spacing={4}>
          <Image
            src={ext === "/" ? "/icons/folder.svg" : `/icons/${ext}.svg`}
            alt={name}
            fallbackSrc={"/icons/file.svg"}
            boxSize="30px"
          />
          {ext === "/" ? (
            <NextLink href={`/storage/files/${path}`}>
              <Link isTruncated>{name}</Link>
            </NextLink>
          ) : (
            <Link isTruncated onClick={downloadFile}>
              {name}
            </Link>
          )}
        </HStack>
      </Td>
      <Td>{lastEdited}</Td>
      <Td>Only you</Td>
      <Td>
        <FileMenu path={path} name={name} ext={ext} />
      </Td>
    </Tr>
  );
};

export default FilesTableRow;
