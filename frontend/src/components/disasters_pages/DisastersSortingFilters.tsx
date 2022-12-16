import Dropdown from "react-bootstrap/Dropdown";
import attributes from "./disasters_filter.js";
import "../../styles/Query.css";

export const DisastersSortingFilters = (
  setSort,
  setStatus,
  setDisasterType,
  setMonth,
  setAffectedCountry
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
          <Dropdown.Item onClick={(e) => setSort("year")}>Year</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Status filter */}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Status
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setStatus("")}>Any</Dropdown.Item>
          {attributes.status.map((item) => (
            <Dropdown.Item onClick={(e) => setStatus("" + item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Disaster Type filter */}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Disaster
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setDisasterType("")}>
            Any
          </Dropdown.Item>
          {attributes.disaster_type.map((item) => (
            <Dropdown.Item onClick={(e) => setDisasterType("" + item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Month filter */}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Month
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setMonth("")}>Any</Dropdown.Item>
          {attributes.month.map((item) => (
            <Dropdown.Item onClick={(e) => setMonth("" + item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {/* Affected Country filter */}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Affected Country
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setAffectedCountry("")}>
            Any
          </Dropdown.Item>
          {attributes.primary.map((item) => (
            <Dropdown.Item onClick={(e) => setAffectedCountry("" + item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
