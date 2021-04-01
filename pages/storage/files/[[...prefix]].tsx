import { Box, VStack, Heading, Divider } from "@chakra-ui/react";
import Head from "next/head";
import FilesTable from "components/storage/FilesTable";
import Aside from "components/storage/Aside";
import Header from "components/storage/Header";

import nookies from "nookies";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { getFiles } from "utils/storage";
import { auth } from "utils/firebaseAdmin";
import { FolderProvider } from "contexts/folder";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Files: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Nexus • Files</title>
      </Head>
      <FolderProvider {...props}>
        <Box width="100%" height="100%" pos="relative" pl="300px">
          <Aside />
          <Header />
          <Divider />
          <VStack
            as="main"
            px="100px"
            py="25px"
            spacing="25px"
            align="flex-start"
          >
            <Heading as="h1" size="lg" fontWeight="medium">
              Home page
            </Heading>
            <Box as="section">
              <Heading py="15px" size="md" fontWeight="medium">
                Quick access
              </Heading>
            </Box>
            <Box as="section" w="100%">
              <Heading py="15px" size="md" fontWeight="medium">
                Files
              </Heading>
              <FilesTable />
            </Box>
          </VStack>
        </Box>
      </FolderProvider>
    </>
  );
};

export default Files;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const { token } = nookies.get(ctx);
    const { uid } = await auth.verifyIdToken(token);
    if (!uid) {
      return {
        redirect: {
          permanent: false,
          destination: "/sign-in",
        },
      };
    }

    const { prefix = [] } = ctx.query as { prefix: string[] };

    //get a root folder or a folder inside of it
    const path = prefix.length ? `${uid}/${prefix.join("/")}/` : `${uid}/`;
    const files = await getFiles(path);

    //first file is a folder itself
    const folderPath = files.shift().path.slice(0, -1);

    return {
      props: {
        initialData: files,
        folderPath,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};
