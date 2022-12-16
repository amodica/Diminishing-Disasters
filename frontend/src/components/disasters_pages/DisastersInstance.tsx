import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TableCell, TableBody, TableRow, Table } from "@mui/material/";
import Navigation from "../Navigation";
import CustomTableRow from "../CustomTableRow";
import Highlighter from "react-highlight-words";
import { RelationshipPagination } from "../Pagination";
import "../../styles/Instance.css";

const DisastersInstance = (props) => {
  const params: any = useParams();
  const disasterId = params.id;
  const [disasters, setDisasters]: [any, any] = useState([]);

  const [postsPerPage] = useState(10);
  const [countries, setCountries]: [any, any] = useState([]);
  const [countryPageCount, setCountryPageCount] = useState(0);
  const [currentCountryItems, setCurrentCountryItems]: [any, any] = useState(
    []
  );
  const [countryOffset, setCountryOffset] = useState(0);

  const [orgs, setOrgs]: [any, any] = useState([]);
  const [orgPageCount, setOrgPageCount] = useState(0);
  const [currentOrgItems, setCurrentOrgItems]: [any, any] = useState([]);
  const [orgOffset, setOrgOffset] = useState(0);

  useEffect(() => {
    const fetchDisasters = async (id) => {
      const { data } = await axios(
        "https://api.diminishingdisasters.me/disasters/" + id
      );
      console.log(data);
      setCountries(data.countries_affected);
      setOrgs(data.organizations_assisting);
      setDisasters(data);
    };
    fetchDisasters(disasterId);
  }, [setDisasters, disasterId]);

  return (
    <div>
      <Navigation />

      <div className="data-table-container">
        <div className="center-text">
          <h1>{disasters.name}</h1>
        </div>
        <div className="center-text">
          <img src={disasters.icon} alt=""></img>
        </div>
        <div>
          <iframe
            title="infographic"
            src={disasters.infographic}
            frameBorder="0"
            scrolling="auto"
            height="500px"
            width="100%"
          ></iframe>
        </div>

        <div>
          <Table>
            {/* Table row for each disasters attribute */}
            <TableBody>
              <CustomTableRow attribute="Name" value={disasters.name} />
              <CustomTableRow
                attribute="Disaster Type"
                value={disasters.disaster_type}
              />
              <CustomTableRow attribute="Status" value={disasters.status} />
              <CustomTableRow attribute="Year" value={disasters.year} />
              <CustomTableRow attribute="Month" value={disasters.month} />
              <CustomTableRow
                attribute="Glide Number"
                value={disasters.glide}
              />
              <CustomTableRow
                attribute="Primary Country"
                value={disasters.primary}
              />
              <CustomTableRow
                attribute="Description"
                value={
                  <Highlighter
                    //color in DisastersInstance.css if it needs to be changed
                    highlightClassName="Highlight"
                    searchWords={[
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "0",
                      " killed",
                      " injured",
                      " displaced people",
                      " people missing",
                      " fatalities",
                      " households affected",
                      " evacuated",
                      " affected citizens",
                      " displaced",
                    ]}
                    autoEscape={true}
                    textToHighlight={disasters.description}
                  />
                }
              />
            </TableBody>
          </Table>
        </div>

        <div className="center-text">
          <h2>Countries Affected</h2>
          <Table>
            <TableBody>
              {currentCountryItems.map((item) => (
                <TableRow
                  key={item[Object.keys(item)[0]]}
                  component={Link}
                  to={"/countries/" + item[Object.keys(item)[0]]}
                >
                  <TableCell align="center">
                    {item[Object.keys(item)[1]]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {RelationshipPagination(
          countryPageCount,
          setCountryPageCount,
          countryOffset,
          setCountryOffset,
          postsPerPage,
          countries,
          setCurrentCountryItems
        )}

        <div className="center-text">
          <h2>Organizations assisting</h2>
          <Table>
            <TableBody>
              {currentOrgItems.map((item) => (
                <TableRow
                  key={item[Object.keys(item)[0]]}
                  component={Link}
                  to={"/organizations/" + item[Object.keys(item)[0]]}
                >
                  <TableCell align="center">
                    {item[Object.keys(item)[1]]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {RelationshipPagination(
          orgPageCount,
          setOrgPageCount,
          orgOffset,
          setOrgOffset,
          postsPerPage,
          orgs,
          setCurrentOrgItems
        )}
      </div>
    </div>
  );
};

export default DisastersInstance;
