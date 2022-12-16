import { TableCell, TableRow, Table } from "@mui/material/";
import { Link } from "react-router-dom";
import { getHighlightedText } from "../HighlightingText";
import { Plane } from  'react-loader-spinner';

export const DisastersInstanceTable = (loading, disasters, q) => {
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
            <TableRow>
              <th>Disaster</th>
              <th>Status</th>
              <th>Disaster Type</th>
              <th>Year</th>
              <th>Month</th>
              <th>Affected Country</th>
            </TableRow>
          </thead>

          <tbody>
            {disasters.map((item) => (
              <TableRow
                key={item.country_area}
                component={Link}
                to={"/disasters/" + item.id}
              >
                <TableCell>{getHighlightedText(item.name, q)}</TableCell>
                <TableCell>{getHighlightedText(item.status, q)}</TableCell>
                <TableCell>
                  {getHighlightedText(item.disaster_type, q)}
                </TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{getHighlightedText(item.month, q)}</TableCell>
                <TableCell>{getHighlightedText(item.primary, q)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
