import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import FilesTableRow from "./FilesTableRow";
import { File } from "utils/types";

interface Props {
  files: File[];
}

const FilesTable: React.FC<Props> = ({ files }) => {
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
