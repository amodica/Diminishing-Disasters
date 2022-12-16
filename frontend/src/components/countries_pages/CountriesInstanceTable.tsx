import { TableCell, TableRow, Table } from "@mui/material/";
import { Link } from "react-router-dom";
import { getHighlightedText } from "../HighlightingText";
import { Plane } from  'react-loader-spinner';

export const CountriesInstanceTable = (loading, countries, q) => {
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
              <th>Country</th>
              <th>Flag</th>
              <th>Population</th>
              <th>Language</th>
              <th>Currency</th>
              <th>Region</th>
              <th>Subregion</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((item) => (
              <TableRow
                key={item.id}
                component={Link}
                to={"/countries/" + item.id}
              >
                <TableCell>{getHighlightedText(item.name, q)}</TableCell>
                <TableCell>
                  {" "}
                  <img src={item.flags} width="50px" alt=""></img>
                </TableCell>
                <TableCell>{item.population}</TableCell>
                <TableCell>{getHighlightedText(item.languages, q)}</TableCell>
                <TableCell>{getHighlightedText(item.currencies, q)}</TableCell>
                <TableCell>{getHighlightedText(item.region, q)}</TableCell>
                <TableCell>{getHighlightedText(item.subregion, q)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
