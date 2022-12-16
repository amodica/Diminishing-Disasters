import { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../Navigation";
import { ModelSearch } from "../ModelSearch";
import { CountriesSortingFilters } from "./CountriesSortingFilters";
import { CountriesInstanceTable } from "./CountriesInstanceTable";
import { Pagination } from "../Pagination";
import "../../styles/Table.css";

const CountriesModelPage = () => {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");
  const [language, setLanguage] = useState("");
  const [currency, setCurrency] = useState("");
  const [region, setRegion] = useState("");
  const [subregion, setSubregion] = useState("");

  const [countries, setCountries] = useState([] as any[]);
  const [total, setTotal] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchCountries = async () => {
      var searchParams = new URLSearchParams({});
      const q_params = (
        currentPage,
        q,
        sort,
        language,
        currency,
        region,
        subregion
      ) => {
        let params = {};
        params["page"] = currentPage;
        if (q !== "") {
          params["q"] = q;
        }
        if (sort !== "") {
          params["sort"] = sort;
        }
        if (language !== "") {
          params["language"] = language;
        }
        if (currency !== "") {
          params["currency"] = currency;
        }
        if (region !== "") {
          params["region"] = region;
        }
        if (subregion !== "") {
          params["subregion"] = subregion;
        }
        return params;
      };
      setLoading(true);
      let params = q_params(
        currentPage,
        q,
        sort,
        language,
        currency,
        region,
        subregion
      );
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
        setTotal(data.total);
        setPageCount(Math.ceil(data.total / postsPerPage));
      } catch (error) {
        // no results found, give 0 results instead of infinite loading
        setCountries([]);
        setTotal(0);
        setPageCount(0);
      }
      setLoading(false);
    };
    fetchCountries();
  }, [
    setCountries,
    setTotal,
    setPageCount,
    setCurrentPage,
    currentPage,
    q,
    sort,
    language,
    currency,
    region,
    subregion,
    postsPerPage,
  ]);

  return (
    <div>
      <Navigation />
      <div className="table-container">
        <div>
          <h2>Countries</h2>
        </div>
        {ModelSearch(setQ)}
        {CountriesSortingFilters(
          setSort,
          setLanguage,
          setCurrency,
          setRegion,
          setSubregion
        )}
        <div>
          <h2>{total} Results Found</h2>
        </div>
        {CountriesInstanceTable(loading, countries, q)}
        {Pagination(pageCount, setCurrentPage)};
      </div>
    </div>
  );
};

export default CountriesModelPage;
