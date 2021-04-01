import {
  Box,
  Grid,
  Center,
  VStack,
  Button,
  Heading,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import withAuthModal from "components/auth/WithAuthModal";
import Header from "components/index/Header";

interface Props {
  triggerModal: () => void;
}

const Index: React.FC<Props> = ({ triggerModal }) => {
  return (
    <>
      <Head>
        <title>Nexus</title>
      </Head>
      <Header />
      <VStack as="main" spacing={12} px={12}>
        <Grid
          as="section"
          width="100%"
          h="calc(100vh - 112px)"
          templateColumns="1fr 1fr"
          justifyItems="center"
        >
          <Center flexDir="column" maxW="450px">
            <Heading as="h1" fontWeight="medium" mb={4}>
              The secure cloud storage for your work group
            </Heading>
            <Text fontSize="lg">
              Nexus is the cloud storage application. It provides work group
              store, efficiently manage and keep files safe.
            </Text>
            <Button
              onClick={triggerModal}
              size="lg"
              colorScheme="teal"
              mt="25px"
              alignSelf="start"
            >
              Get started
            </Button>
          </Center>
          <Box />
        </Grid>
      </VStack>
    </>
  );
};

export default withAuthModal(Index);
