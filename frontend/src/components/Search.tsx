import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Navigation from "./Navigation";
import countryAttributes from "./countries_pages/countries_filter.js";
import disasterAttributes from "./disasters_pages/disasters_filter.js";
import organizationsAttributes from "./organizations_pages/organizations_filter.js";
import { CountriesInstanceTable } from "./countries_pages/CountriesInstanceTable";
import { DisastersInstanceTable } from "./disasters_pages/DisastersInstanceTable";
import { OrganizationsInstanceTable } from "./organizations_pages/OrganizationsInstanceTable";
import "../styles/Table.css";
import "../styles/Search.css";

const Search = () => {
  const [q, setQ] = useState("");
  const [buttonClicked, setButtonClicked] = useState(0);

  const [countriesLoading, setCountriesLoading] = useState(true);
  const [disastersLoading, setDisastersLoading] = useState(true);
  const [organizationsLoading, setOrganizationsLoading] = useState(true);

  const [countries, setCountries] = useState([] as any[]);
  const [region, setRegion] = useState("");

  const [disasters, setDisasters] = useState([] as any[]);
  const [disasterType, setDisasterType] = useState("");

  const [organizations, setOrganizations] = useState([] as any[]);
  const [cause, setCause] = useState("");

  const [countriesTotal, setCountriesTotal] = useState(0);
  const [disastersTotal, setDisastersTotal] = useState(0);
  const [organizationsTotal, setOrganizationsTotal] = useState(0);

  const fetchCountries = async () => {
    var searchParams = new URLSearchParams({});
    const q_params = (q, region) => {
      let params = {};
      if (q !== "") {
        params["q"] = q;
      }
      if (region !== "") {
        params["region"] = region;
      }
      return params;
    };
    setCountriesLoading(true);
    let params = q_params(q, region);
    for (const property in params) {
      console.log(property);
      console.log(params[property]);
      searchParams.set(property, params[property]);
    }
    console.log(searchParams);
    try {
      const { data } = await axios(
        "https://api.diminishingdisasters.me/countries?" + searchParams
      );
      console.log(data);
      setCountries(data.countries);
      setCountriesTotal(data.total);
      // setPageCount(Math.ceil(data.total / postsPerPage));
    } catch (error) {
      // no results found, give 0 results instead of infinite loading
      setCountries([]);
      setCountriesTotal(0);
      // setPageCount(0);
    }
    setCountriesLoading(false);
  };

  const fetchDisasters = async () => {
    var searchParams = new URLSearchParams({});
    const q_params = (q, disasterType) => {
      let params = {};
      if (q !== "") {
        params["q"] = q;
      }
      if (disasterType !== "") {
        params["type"] = disasterType;
      }
      return params;
    };
    setDisastersLoading(true);
    let params = q_params(q, disasterType);
    for (const property in params) {
      console.log(property);
      console.log(params[property]);
      searchParams.set(property, params[property]);
    }
    console.log(searchParams);
    try {
      const { data } = await axios(
        "https://api.diminishingdisasters.me/disasters?" + searchParams
      );
      console.log(data);
      setDisasters(data.disasters);
      setDisastersTotal(data.total);
      // setPageCount(Math.ceil(data.total / postsPerPage));
    } catch (error) {
      // no results found, give 0 results instead of infinite loading
      setDisasters([]);
      setDisastersTotal(0);
      // setPageCount(0);
    }
    setDisastersLoading(false);
  };

  const fetchOrganizations = async () => {
    var searchParams = new URLSearchParams({});
    const q_params = (q, cause) => {
      let params = {};
      if (q !== "") {
        params["q"] = q;
      }
      if (cause !== "") {
        params["cause"] = cause;
      }
      return params;
    };
    setOrganizationsLoading(true);
    let params = q_params(q, cause);
    for (const property in params) {
      console.log(property);
      console.log(params[property]);
      searchParams.set(property, params[property]);
    }
    console.log(searchParams);
    try {
      const { data } = await axios(
        "https://api.diminishingdisasters.me/organizations?" + searchParams
      );
      console.log(data);
      setOrganizations(data.organizations);
      setOrganizationsTotal(data.total);
      // setPageCount(Math.ceil(data.total / postsPerPage));
    } catch (error) {
      // no results found, give 0 results instead of infinite loading
      setOrganizations([]);
      setOrganizationsTotal(0);
      // setPageCount(0);
    }
    setOrganizationsLoading(false);
  };

  useEffect(() => {
    fetchCountries();
    fetchDisasters();
    fetchOrganizations();
  }, [buttonClicked]);

  useEffect(() => {
    fetchCountries();
  }, [region]);

  useEffect(() => {
    fetchDisasters();
  }, [disasterType]);

  useEffect(() => {
    fetchOrganizations();
  }, [cause]);

  const handleChange = (e) => {
    setQ(e.target.value);
  };

  const handleSearch = () => {
    setButtonClicked(buttonClicked + 1);
  };

  return (
    <div>
      <Navigation />
      <div className="table-container">
        <div className="centered search">
          <TextField
            id="outlined-basic"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            label="Search"
          />
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>

        {/* filters */}
        <div className="query-container">
          {/* Region filter */}
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Region
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => setRegion("")}>Any</Dropdown.Item>
              {countryAttributes.region.map((item) => (
                <Dropdown.Item onClick={(e) => setRegion("" + item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* Disaster Type filter */}
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Disaster Type
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => setDisasterType("")}>
                Any
              </Dropdown.Item>
              {disasterAttributes.disaster_type.map((item) => (
                <Dropdown.Item onClick={(e) => setDisasterType("" + item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* Causes filter */}
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Causes
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => setCause("")}>Any</Dropdown.Item>
              {organizationsAttributes.cause.map((item) => (
                <Dropdown.Item onClick={(e) => setCause("" + item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div>
          {/* countries table */}
          <div>
            <h2>{countriesTotal} Countries Found</h2>
          </div>

          {CountriesInstanceTable(countriesLoading, countries, q)}

        {/* disasters table */}
          <div>
            <h2>{disastersTotal} Disasters Found</h2>
          </div>
          {DisastersInstanceTable(disastersLoading, disasters, q)}

        {/* organizations table */}
          <div>
            <h2>{organizationsTotal} Organizations Found</h2>
          </div>
          {OrganizationsInstanceTable(organizationsLoading, organizations, q)}
        </div>
      </div>
    </div>
  );
};

export default Search;
