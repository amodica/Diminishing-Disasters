import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import { ModelSearch } from "../ModelSearch";
import { OrganizationsInstanceTable } from "./OrganizationsInstanceTable";
import { OrganizationsSortingFilters } from "./OrganizationsSortingFilters";
import { Pagination } from "../Pagination";
import "../../styles/Table.css";

const OrganizationsModelPage = () => {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");
  const [rating, setRating] = useState("");
  const [cause, setCause] = useState("");

  const [orgs, setOrgs] = useState([] as any[]);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchOrgs = async () => {
      var searchParams = new URLSearchParams({});
      const q_params = (currentPage, q, sort, rating, cause) => {
        let params = {};
        params["page"] = currentPage;
        if (q !== "") {
          params["q"] = q;
        }
        if (sort !== "") {
          params["sort"] = sort;
        }
        if (rating !== "") {
          params["rating"] = rating;
        }
        if (cause !== "") {
          params["cause"] = cause;
        }
        return params;
      };
      setLoading(true);
      let params = q_params(currentPage, q, sort, rating, cause);
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
        setOrgs(data.organizations);
        setTotal(data.total);
        setPageCount(Math.ceil(data.total / postsPerPage));
      } catch (error) {
        // no results found, give 0 results instead of infinite loading
        setOrgs([]);
        setTotal(0);
        setPageCount(0);
      }
      setLoading(false);
    };
    fetchOrgs();
  }, [
    setOrgs,
    setTotal,
    setPageCount,
    setCurrentPage,
    currentPage,
    q,
    sort,
    rating,
    cause,
    postsPerPage,
  ]);

  return (
    <div>
      <Navigation />
      <div className="table-container">
        <div>
          <h2>Organizations</h2>
        </div>
        {ModelSearch(setQ)}
        {OrganizationsSortingFilters(setSort, setRating, setCause)}
        <div>
          <h2>{total} Results Found</h2>
        </div>
        {OrganizationsInstanceTable(loading, orgs, q)}
        {Pagination(pageCount, setCurrentPage)};
      </div>
    </div>
  );
};

export default OrganizationsModelPage;
