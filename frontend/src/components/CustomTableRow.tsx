import { TableCell, TableRow } from "@mui/material/";

function CustomTableRow(props) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>
        <b>{props.attribute}</b>
      </TableCell>
      <TableCell>{props.value}</TableCell>
    </TableRow>
  );
}

export default CustomTableRow;
