import { Flex, Text, VStack, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const routes = [
  { name: "Files", path: "/storage/files" },
  { name: "Common", path: "/storage/common" },
  { name: "Recovery", path: "/storage/recovery" },
  { name: "Settings", path: "/storage/settings" },
];

interface Props {}

const Aside: React.FC<Props> = () => {
  return (
    <Flex
      direction="column"
      width="300px"
      height="100vh"
      pl={8}
      bg="blue.600"
      color="gray.200"
      fontSize={26}
      pos="fixed"
      top="0"
      left="0"
    >
      <Text fontWeight="semibold" py={6}>
        Nexus
      </Text>
      <VStack as="nav" spacing={4} align="flex-start">
        {routes.map(({ name, path }) => (
          <NextLink href={path} key={path}>
            <Link>{name}</Link>
          </NextLink>
        ))}
      </VStack>
    </Flex>
  );
};

export default Aside;
