import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import FilesTableRow from "./FilesTableRow";

type File = {
  name: string;
  updated: string;
  id: string;
};

interface Props {
  files: File[];
}

const ObjectsTable: React.FC<Props> = ({ files }) => {
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
        {files.map(({ name, updated, id }) => (
          <FilesTableRow name={name} updated={updated} key={id} />
        ))}
      </Tbody>
    </Table>
  );
};

export default ObjectsTable;
