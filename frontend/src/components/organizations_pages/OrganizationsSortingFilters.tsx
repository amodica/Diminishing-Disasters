import Dropdown from "react-bootstrap/Dropdown";
import attributes from "./organizations_filter.js";
import "../../styles/Query.css";

export const OrganizationsSortingFilters = (setSort, setRating, setCause) => {
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
          <Dropdown.Item onClick={(e) => setSort("score")}>Score</Dropdown.Item>
          <Dropdown.Item onClick={(e) => setSort("income")}>
            Total Income
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Rating filter */}
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Rating
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => setRating("")}>Any</Dropdown.Item>
          {attributes.rating.map((item) => (
            <Dropdown.Item onClick={(e) => setRating("" + item)}>
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
          {attributes.cause.map((item) => (
            <Dropdown.Item onClick={(e) => setCause("" + item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
