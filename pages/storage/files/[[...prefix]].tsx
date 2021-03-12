import { Box, VStack, Heading, Divider } from "@chakra-ui/react";
import FilesTable from "components/storage/Table/FilesTable";
import Aside from "components/storage/Aside";
import Header from "components/storage/Header/Header";

import nookies from "nookies";
import axios from "axios";
import useSWR from "swr";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { getFiles } from "utils/storage";
import { auth } from "utils/firebaseAdmin";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Files: React.FC<Props> = ({ initialData, currentFolderPath }) => {
  const { data: files, mutate } = useSWR(
    `/api/storage/folder/${currentFolderPath}`,
    fetcher,
    {
      initialData,
    }
  );

  return (
    <Box width="100%" height="100%" pos="relative" pl="300px">
      <Aside />
      <Header mutate={mutate} currentFolderPath={currentFolderPath} />
      <Divider />
      <VStack as="main" px="100px" py="25px" spacing="25px" align="flex-start">
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
            Recent files
          </Heading>
          <FilesTable files={files} />
        </Box>
      </VStack>
    </Box>
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
    const currentFolderPath = files.shift().path;

    return {
      props: {
        uid,
        initialData: files,
        prefix,
        currentFolderPath,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};
