import { Table, TableBody } from "baseUI/table";
import { TableColumn } from "./components/tableColumn";
import { TableRow } from "./components/tableRow";
import useViewModel from "./viewModel3";

export const OverallPage = () => {
  const { data, onRemoveData, onDuplicateData, errorsRows } = useViewModel();
  return (
    <div className=" p-8 pt-[72px] mx-auto">
      <Table>
        <TableColumn />
        <TableBody>
          {data.map((entry, index) => (
            <TableRow
              data={entry}
              index={index}
              onRemove={onRemoveData}
              onDuplicateData={onDuplicateData}
              error={errorsRows.includes(index)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
