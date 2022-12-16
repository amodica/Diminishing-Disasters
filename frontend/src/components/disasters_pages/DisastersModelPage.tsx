import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import { ModelSearch } from "../ModelSearch";
import { DisastersSortingFilters } from "./DisastersSortingFilters";
import { DisastersInstanceTable } from "./DisastersInstanceTable";
import { Pagination } from "../Pagination";
import "../../styles/Table.css";

const DisastersModelPage = () => {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");
  const [status, setStatus] = useState("");
  const [disasterType, setDisasterType] = useState("");
  const [month, setMonth] = useState("");
  const [affectedCountry, setAffectedCountry] = useState("");

  const [disasters, setDisasters] = useState([] as any[]);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchDisasters = async () => {
      var searchParams = new URLSearchParams({});
      const q_params = (
        currentPage,
        q,
        sort,
        status,
        disasterType,
        month,
        affectedCountry
      ) => {
        let params = {};
        params["page"] = currentPage;
        if (q !== "") {
          params["q"] = q;
        }
        if (sort !== "") {
          params["sort"] = sort;
        }
        if (status !== "") {
          params["status"] = status;
        }
        if (disasterType !== "") {
          params["type"] = disasterType;
        }
        if (month !== "") {
          params["month"] = month;
        }
        if (affectedCountry !== "") {
          params["primary"] = affectedCountry;
        }
        return params;
      };
      setLoading(true);
      let params = q_params(
        currentPage,
        q,
        sort,
        status,
        disasterType,
        month,
        affectedCountry
      );
      for (const property in params) {
        console.log(property);
        console.log(params[property]);
        searchParams.set(property, params[property]);
      }
      try {
        const { data } = await axios(
          "https://api.diminishingdisasters.me/disasters?" + searchParams
        );
        console.log(data);
        setDisasters(data.disasters);
        setTotal(data.total);
        setPageCount(Math.ceil(data.total / postsPerPage));
      } catch (error) {
        // no results found, give 0 results instead of infinite loading
        setDisasters([]);
        setTotal(0);
        setPageCount(0);
      }
      setLoading(false);
    };
    fetchDisasters();
  }, [
    setDisasters,
    setTotal,
    setPageCount,
    setCurrentPage,
    currentPage,
    q,
    sort,
    status,
    disasterType,
    month,
    affectedCountry,
    postsPerPage,
  ]);

  return (
    <div>
      <Navigation />
      <div className="table-container">
        <div>
          <h2>Disasters</h2>
        </div>
        {ModelSearch(setQ)}
        {DisastersSortingFilters(
          setSort,
          setStatus,
          setDisasterType,
          setMonth,
          setAffectedCountry
        )}
        <div>
          <h2>{total} Results Found</h2>
        </div>
        {DisastersInstanceTable(loading, disasters, q)}
        {Pagination(pageCount, setCurrentPage)};
      </div>
    </div>
  );
};

export default DisastersModelPage;
