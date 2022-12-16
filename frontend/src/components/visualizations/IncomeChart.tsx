import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
} from "recharts";
import { Plane } from "react-loader-spinner";

const IncomeChart = () => {
  const [data, setData] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    let promises: Array<any> = [];
    for (let i = 19; i <= 20; i++) {
      promises.push(
        axios.get(
          "https://api.diminishingdisasters.me/organizations?page=" +
            i +
            "&sort=income"
        )
      );
    }
    let responses = await Promise.all(promises);
    let organizations = responses.map((x) => x.data.organizations);
    let unsortedMap = new Map();
    for (let orgArray of organizations) {
      for (let org of orgArray) {
        unsortedMap.set(org.name, org.income);
      }
    }
    let sortedMap = new Map([...unsortedMap].sort((a, b) => b[1] - a[1]));
    let useableData: any[] = [];
    let keys = sortedMap.keys();
    let values = sortedMap.values();
    for (let j = 1; j <= 10; j++) {
      useableData.push({
        x: keys.next().value,
        y: values.next().value,
      });
    }
    console.log(useableData);
    setData(useableData);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <p>Loading...</p>
          <Plane
            // height="100"
            // width="100"
            color="#87CEFA"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <div>
            <ScatterChart
              width={800}
              height={400}
              margin={{
                top: 20,
                right: 100,
                bottom: 20,
                left: 100,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis
                type="category"
                dataKey="x"
                label={{
                  value: "Organization",
                  position: "insideBottom",
                  offset: -10,
                }}
                name="Organization"
              />
              <YAxis
                type="number"
                dataKey="y"
                label={{
                  value: "Income",
                  position: "insideLeft",
                  angle: -90,
                  offset: -80,
                }}
                name="Income"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter
                name="Organizations by Income"
                data={data}
                fill="#8884d8"
              ></Scatter>
            </ScatterChart>
          </div>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default IncomeChart;
