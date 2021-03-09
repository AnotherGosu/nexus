import React from "react";
import { Grid, CircularProgress } from "@chakra-ui/react";
import FileCard from "./FileCard";

import useSwr from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface Props {
  initialFiles: string[];
}

const FilesGrid: React.FC<Props> = ({ initialFiles }) => {
  const { data: files, error } = useSwr("/api/storage", fetcher, {
    initialData: initialFiles,
  });

  return files ? (
    <Grid
      w="100%"
      minH="600px"
      gridTemplateColumns="repeat(auto-fill, 150px)"
      gridAutoRows="150px"
      gap="25px"
    >
      {files.map((fileName: string) => (
        <FileCard key={fileName} fileName={fileName} />
      ))}
    </Grid>
  ) : (
    <CircularProgress isIndeterminate />
  );
};

export default FilesGrid;
