import Dropdown from "react-bootstrap/Dropdown";
import attributes from "./countries_filter.js";
import "../../styles/Query.css";

export const CountriesSortingFilters = (
  setSort,
  setLanguage,
  setCurrency,
  setRegion,
  setSubregion
) => {
  return (
    <div className="query-container">
      {/* Sort filter */}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Sort
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setSort("")}>None</Dropdown.Item>
          <Dropdown.Item onClick={(e) => setSort("name")}>Name</Dropdown.Item>
          <Dropdown.Item onClick={(e) => setSort("population")}>
            Population
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Language filter */}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Language
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setLanguage("")}>Any</Dropdown.Item>
          {attributes.languages.map((item) => (
            <Dropdown.Item onClick={(e) => setLanguage("" + item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Currency filter */}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Currency
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setCurrency("")}>Any</Dropdown.Item>
          {attributes.currencies.map((item) => (
            <Dropdown.Item onClick={(e) => setCurrency("" + item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Region filter */}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Region
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setRegion("")}>Any</Dropdown.Item>
          {attributes.region.map((item) => (
            <Dropdown.Item onClick={(e) => setRegion("" + item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Subregion filter */}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Subregion
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setSubregion("")}>Any</Dropdown.Item>
          {attributes.subregion.map((item) => (
            <Dropdown.Item onClick={(e) => setSubregion("" + item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
