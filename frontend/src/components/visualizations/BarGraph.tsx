import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Plane } from  'react-loader-spinner';
import * as d3 from "d3";

let time = 0;

const BarGraph = () => {
  let type: any[][] = [[], []];
  const [data, setData] = useState(type);
  const svgRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    let promises: Array<any> = [];
    for (let i = 1; i <= 250; i++) {
      promises.push(
        axios.get("https://api.diminishingdisasters.me/countries/" + i)
      );
    }
    let responses = await Promise.all(promises);
    let countries = responses.map((x) => x.data);
    let unsortedMap = new Map();
    for (let country of countries) {
      unsortedMap.set(country.name, country.disasters.length);
    }
    let sortedMap = new Map([...unsortedMap].sort((a, b) => b[1] - a[1]));
    let useableData: any[][] = [[], []];
    let keys = sortedMap.keys();
    let values = sortedMap.values();
    for (let j = 1; j <= 10; j++) {
      useableData[0].push(keys.next().value);
      useableData[1].push(values.next().value);
    }
    setData(useableData);
    time++;
  };

  useEffect(() => {
    // setting up svg container
    if (time === 0) {
      getData();
    }
    const width = 600;
    const height = 400;
    const color = d3.scaleOrdinal().range(d3.schemeSet1);
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible")
      .style("margin-top", "75px")
      .style("margin-bottom", "400px");

    // setting the scaling
    const xScale = d3
      .scaleBand()
      .domain(data[0].map((val, i) => i))
      .range([0, width])
      .padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data[1])])
      .range([height, 0]);

    // setting the axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data[0].length)
      .tickFormat(function (d) {
        return data[0][d];
      });

    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g").call(xAxis).attr("transform", `translate(0, ${height})`);

    svg.append("g").call(yAxis);

    // setting the svg data
    svg
      .selectAll(".bar")
      .data(data[1])
      .join("rect")
      .attr("x", (v, i) => xScale(i))
      .attr("y", yScale)
      .attr("width", xScale.bandwidth())
      .attr("height", (val) => height - yScale(val))
      .attr("fill", (d, i) => color(data[1][i]))
      .style("opacity", 0.7);
    setLoading(false);
  }, [data]);

  return (
    <div>
      {loading ? (
        <div>
        <p>Loading...</p>
        <Plane
              // height="100"
              // width="100"
              color='#87CEFA'
              ariaLabel='loading'
          />
      </div>
      ) : (
        <svg className="center-svg" ref={svgRef}></svg>
      )}
    </div>
  );
};
export default BarGraph;
