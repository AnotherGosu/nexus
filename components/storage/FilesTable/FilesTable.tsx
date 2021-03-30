import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import FilesTableRow from "./FilesTableRow";

import { useFolder } from "contexts/folder";

const FilesTable: React.FC = () => {
  const { files } = useFolder();

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Last edited</Th>
          <Th>Members</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {files.map((file) => (
          <FilesTableRow key={file.id} {...file} />
        ))}
      </Tbody>
    </Table>
  );
};

export default FilesTable;
