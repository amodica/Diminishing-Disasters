import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TableCell, TableBody, TableRow, Table } from "@mui/material/";
import Navigation from "../Navigation";
import CustomTableRow from "../CustomTableRow";
import GoogleMapReact from "google-map-react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { RelationshipPagination } from "../Pagination";
import "../../styles/Instance.css";

const CountriesInstance = (props) => {
  const params: any = useParams();
  const countryId = params.id;
  const [countries, setCountries]: [any, any] = useState([] as any[]);
  const [countriesLat, setCountriesLat]: [any, any] = useState([]);
  const [countriesLong, setCountriesLong]: [any, any] = useState([]);

  const [postsPerPage] = useState(10);
  const [disasters, setDisasters]: [any, any] = useState([]);
  const [disasterPageCount, setDisasterPageCount] = useState(0);
  const [currentDisasterItems, setCurrentDisasterItems]: [any, any] = useState(
    []
  );
  const [disasterOffset, setDisasterOffset] = useState(0);

  const [orgs, setOrgs]: [any, any] = useState([]);
  const [orgPageCount, setOrgPageCount] = useState(0);
  const [currentOrgItems, setCurrentOrgItems]: [any, any] = useState([]);
  const [orgOffset, setOrgOffset] = useState(0);

  useEffect(() => {
    const fetchCountries = async (id) => {
      const { data } = await axios(
        "https://api.diminishingdisasters.me/countries/" + id
      );
      try {
        const result = await getGeocode({ address: data.name });
        const { lat, lng } = await getLatLng(result[0]);
        setCountriesLat(lat);
        setCountriesLong(lng);
      } catch {
        setCountriesLat(0);
        setCountriesLong(0);
      }
      console.log(data);
      console.log(data.disasters);
      console.log(data.organizations);
      setCountries(data);
      setDisasters(data.disasters);
      setOrgs(data.organizations);
    };
    fetchCountries(countryId);
  }, [setCountries, countryId]);

  return (
    <div>
      <Navigation />

      <div className="data-table-container">
        <div className="center-text">
          <h1>{countries.name}</h1>
        </div>
        <div className="center-text">
          <img src={countries.flags} alt=""></img>
        </div>
        <div style={{ height: "50vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyDF_ogI3vhxcStni7NTo3Y4C3DisWqnSvE",
            }}
            center={[countriesLat, countriesLong]}
            defaultZoom={6}
            options={{
              styles: [
                {
                  featureType: "all",
                  elementType: "labels",
                  stylers: [{ visibility: "on" }],
                },
              ],
            }}
          ></GoogleMapReact>
        </div>

        <div>
          <Table>
            {/* Table row for each country attribute */}
            <TableBody>
              <CustomTableRow
                attribute="Population"
                value={countries.population}
              />
              <CustomTableRow
                attribute="Capital City"
                value={countries.capital}
              />
              <CustomTableRow
                attribute="Time Zone"
                value={countries.timezones}
              />
              <CustomTableRow
                attribute="Languages"
                value={countries.languages}
              />
              <CustomTableRow
                attribute="Currencies"
                value={countries.currencies}
              />
              <CustomTableRow attribute="Region" value={countries.region} />
              <CustomTableRow
                attribute="Subregion"
                value={countries.subregion}
              />
              <CustomTableRow attribute="Area" value={countries.area} />
            </TableBody>
          </Table>
        </div>

        <div className="center-text">
          <h2>Disasters in {countries.name}</h2>
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

        <div className="center-text">
          <h2>Charities in {countries.name}</h2>
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

export default CountriesInstance;
