import { HStack, Image, Tr, Td, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import ObjectMenu from "./FileMenu";
import { useRouter } from "next/router";
import { File } from "utils/types";

const ObjectsTableRow: React.FC<File> = ({ name, updated, path }) => {
  const router = useRouter();
  const [_, ext] = name.split(/\.(?=[^\.]+$)/);
  // const { prefix = [] } = router.query as { prefix: string[] };
  // const path = prefix.length ? prefix.join("/") + "/" : "";

  return (
    <Tr>
      <Td>
        <HStack spacing={4}>
          <Image
            src={ext ? `/icons/${ext}.svg` : "/icons/folder.svg"}
            alt="File extansion"
            boxSize="30px"
          />
          <NextLink href={`/storage/files/${path}`}>
            <Link isTruncated>{name}</Link>
          </NextLink>
        </HStack>
      </Td>
      <Td>{updated}</Td>
      <Td>Only you</Td>
      <Td>
        <ObjectMenu />
      </Td>
    </Tr>
  );
};

export default ObjectsTableRow;
