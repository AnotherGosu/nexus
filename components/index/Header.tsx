import { Flex, HStack, Button, Link, Text } from "@chakra-ui/react";
import { useAuth } from "../../contexts/auth";
import NextLink from "next/link";

const Header: React.FC = () => {
  const { userId, signOut } = useAuth();
  return (
    <Flex as="header" justify="space-between" align="center" py={8} px={12}>
      <Text fontSize={30} fontWeight="bold">
        Nexus
      </Text>
      <HStack as="nav" fontSize={20} spacing={10}>
        <NextLink href="/products">
          <Link>Products</Link>
        </NextLink>
        <NextLink href="/pricing">
          <Link>Pricing</Link>
        </NextLink>
        <NextLink href="/about">
          <Link>About</Link>
        </NextLink>
        <NextLink href="/help">
          <Link>Help</Link>
        </NextLink>
      </HStack>
      {!userId ? (
        <HStack spacing={10}>
          <NextLink href="sign-in">
            <Link fontSize={20} fontWeight="semibold" color="blue.500">
              Sign In
            </Link>
          </NextLink>
          <NextLink href="sign-up">
            <Button size="lg" colorScheme="teal">
              Sign Up
            </Button>
          </NextLink>
        </HStack>
      ) : (
        <Button size="lg" colorScheme="teal" onClick={signOut}>
          Sign Out
        </Button>
      )}
    </Flex>
  );
};

export default Header;
