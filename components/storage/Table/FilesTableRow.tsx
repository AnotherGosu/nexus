import { HStack, Image, Text, Tr, Td, Link } from "@chakra-ui/react";
import ObjectMenu from "./FileMenu";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  name: string;
  updated: string;
}

const ObjectsTableRow: React.FC<Props> = ({ name, updated }) => {
  const [_, ext] = name.split(/\.(?=[^\.]+$)/);
  const { prefix = [] } = useRouter().query as { prefix: string[] };
  const path = prefix.length ? prefix.join("/") + "/" : "";

  return (
    <Tr>
      <Td>
        <HStack spacing={4}>
          <Image
            src={ext ? `/icons/${ext}.svg` : "/icons/folder.svg"}
            alt="File extansion"
            boxSize="30px"
          />
          <NextLink href={`/storage/files/${path}${name}`}>
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
