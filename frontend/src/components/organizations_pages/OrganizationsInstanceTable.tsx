import { TableCell, TableRow, Table } from "@mui/material/";
import { Link } from "react-router-dom";
import { getHighlightedText } from "../HighlightingText";
import { Plane } from  'react-loader-spinner';

export const OrganizationsInstanceTable = (loading, orgs, q) => {
  return (
    <div>
      {loading ? (
        <div className="centered">
          <Plane
                // height="100"
                // width="100"
                color='#87CEFA'
                ariaLabel='loading'
            />
        </div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Charities</th>
              <th>Rating</th>
              <th>Total Income</th>
              <th>Category</th>
              <th>Cause</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {orgs.map((item) => (
              <TableRow
                key={item.id}
                component={Link}
                to={"/organizations/" + item.id}
              >
                <TableCell>{getHighlightedText(item.name, q)}</TableCell>
                <TableCell>{item.rating}</TableCell>
                <TableCell>{item.income}</TableCell>
                <TableCell>{getHighlightedText(item.category, q)}</TableCell>
                <TableCell>{getHighlightedText(item.cause, q)}</TableCell>
                <TableCell>{item.score}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
