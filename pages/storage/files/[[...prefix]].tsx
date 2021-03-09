import { Box, VStack, Heading, Divider } from "@chakra-ui/react";
import FilesTable from "components/storage/Table/FilesTable";
import Aside from "components/storage/Aside";
import Header from "components/storage/Header";

import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { getFiles } from "utils/storage";
import nookies from "nookies";
import axios from "axios";
import firebaseAdmin from "utils/firebaseAdmin";
import useSWR from "swr";

const fetcher = (url: string, userId: string, prefix: string[]) =>
  axios
    .get(url, { params: { userId, prefix: prefix.join(",") } })
    .then((res) => res.data);

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const Files: React.FC<Props> = ({ initialData, userId, prefix }) => {
  const { data: files, mutate } = useSWR(
    ["/api/storage", userId, prefix],
    fetcher,
    {
      initialData,
    }
  );

  return (
    <Box width="100%" height="100%" pos="relative" pl="300px">
      <Aside />
      <Header mutate={mutate} />
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
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;
    const prefix = (ctx.query.prefix as string[]) || [];
    const files = await getFiles(uid, prefix);
    return {
      props: {
        initialData: files,
        userId: uid,
        prefix,
      },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/sign-in",
      },
      props: {} as never,
    };
  }
};
