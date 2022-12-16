import axios from "axios";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useParams, Link } from "react-router-dom";
import { TableCell, TableBody, TableRow, Table } from "@mui/material/";
import Navigation from "../Navigation";
import CustomTableRow from "../CustomTableRow";
import { RelationshipPagination } from "../Pagination";
import "../../styles/Instance.css";

const OrganizationsInstance = (props) => {
  const params: any = useParams();
  const orgId = params.id;
  const [orgs, setOrgs]: [any, any] = useState([]);

  const [postsPerPage] = useState(10);
  const [countries, setCountries]: [any, any] = useState([]);
  const [countryPageCount, setCountryPageCount] = useState(0);
  const [currentCountryItems, setCurrentCountryItems]: [any, any] = useState(
    []
  );
  const [countryOffset, setCountryOffset] = useState(0);

  const [disasters, setDisasters]: [any, any] = useState([]);
  const [disasterPageCount, setDisasterPageCount] = useState(0);
  const [currentDisasterItems, setCurrentDisasterItems]: [any, any] = useState(
    []
  );
  const [disasterOffset, setDisasterOffset] = useState(0);

  useEffect(() => {
    const fetchCountries = async (id) => {
      const { data } = await axios(
        "https://api.diminishingdisasters.me/organizations/" + id
      );
      console.log(data);
      setCountries(data.countries_operating_in);
      setDisasters(data.disasters_assisted_in);
      setOrgs(data);
    };
    fetchCountries(orgId);
  }, [setOrgs, orgId]);

  return (
    <div>
      <Navigation />

      <div className="data-table-container">
        <div className="center-text">
          <h1>{orgs.name}</h1>
        </div>
        <div className="center-text">
          <img src={orgs.logo} width="auto" height="200" alt="" />
        </div>
        <div>
          <iframe
            title="video"
            src={orgs.video}
            frameBorder="0"
            scrolling="auto"
            height="500px"
            width="100%"
          ></iframe>
        </div>

        <Table>
          {/* Table row for each country attribute */}
          <TableBody>
            <CustomTableRow
              data-tip
              data-for="ratingTip"
              attribute={
                <a href="#/" data-tip data-for="ratingTip">
                  {
                    <a
                      href="https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1287"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Rating*
                    </a>
                  }
                </a>
              }
              value={orgs.rating}
            />
            <ReactTooltip id="ratingTip" aria-haspopup="true">
              <p>*Charities are rated based on their overall score:</p>
              <table>
                <tr>
                  <th>Score</th>
                  <th>Rating</th>
                </tr>
                <tr>
                  <td>&ge;90&emsp;</td>
                  <td>4 stars</td>
                </tr>
                <tr>
                  <td>80 - 90&emsp;</td>
                  <td>3 stars</td>
                </tr>
                <tr>
                  <td>70 - 80&emsp;</td>
                  <td>2 stars</td>
                </tr>
                <tr>
                  <td>55 - 70&emsp;</td>
                  <td>1 stars</td>
                </tr>
                <tr>
                  <td>&lt;55&emsp;</td>
                  <td>0 stars</td>
                </tr>
              </table>
              <p>
                Click to learn about the details of the methodology and
                calculations.
              </p>
            </ReactTooltip>
            <CustomTableRow attribute="EIN" value={orgs.ein} />
            <CustomTableRow
              attribute={
                <a href="#/" data-tip data-for="scoreTip">
                  {
                    <a
                      href="https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1287"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Score*
                    </a>
                  }
                </a>
              }
              value={orgs.score}
            />
            <ReactTooltip id="scoreTip" aria-haspopup="true">
              <p>
                *A charity&apos;s overall score, on a scale of 0 to 100,
                &nbsp;is derived by analyzing the charity&apos;s:&nbsp;
              </p>
              <p>(1) Financial Health and&nbsp;</p>
              <p>(2) Accountability and Transparency performance. &nbsp;</p>
              <p>
                Click to learn about the details of the methodology and
                calculations.
              </p>
            </ReactTooltip>
            <CustomTableRow attribute="Total Income" value={orgs.income} />
            <CustomTableRow attribute="Category" value={orgs.category} />
            <CustomTableRow attribute="Address" value={orgs.address} />
            <CustomTableRow attribute="Website URL" value={orgs.url} />
            <CustomTableRow attribute="Cause" value={orgs.cause} />
            <CustomTableRow attribute="Tagline" value={orgs.tagline} />
          </TableBody>
        </Table>

        <div className="center-text">
          <h2>
            <a href={orgs.url}>Organization Website</a>
          </h2>
        </div>
        <div>
          <iframe
            title="website"
            src={orgs.url}
            height="500px"
            width="750px"
          ></iframe>
        </div>
        <div className="center-text">
          <h2>Countries Operating In</h2>
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
          <h2>Disasters Assisted In</h2>
          <Table>
            <TableBody>
              {currentDisasterItems.map((item) => (
                <TableRow
                  key={item[Object.keys(item)[0]]}
                  component={Link}
                  to={"/disasters/" + item[Object.keys(item)[0]]}
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
          disasterPageCount,
          setDisasterPageCount,
          disasterOffset,
          setDisasterOffset,
          postsPerPage,
          disasters,
          setCurrentDisasterItems
        )}
      </div>
    </div>
  );
};

export default OrganizationsInstance;
