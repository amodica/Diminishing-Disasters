import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import { Plane } from "react-loader-spinner";

const PieGraph = () => {
  const [data, setData] = useState([] as any[]);
  const [loading, setLoading] = useState(false);

  const roundToHundredth = (value) => {
    return Number(value.toFixed(2));
  };

  const getData = async () => {
    setLoading(true);
    let orgs: Array<any> = [];
    for (let i = 1; i <= 20; i++) {
      orgs.push(
        axios.get("https://api.diminishingdisasters.me/organizations?page=" + i)
      );
    }
    let response1 = await Promise.all(orgs);
    let organizations = response1.map((x) => x.data.organizations);
    let averages = new Map();
    let numCauses = new Map();
    for (let orgArray of organizations) {
      for (let org of orgArray) {
        if (!averages.has(org.cause)) {
          averages.set(org.cause, org.score);
          numCauses.set(org.cause, 1);
        } else {
          averages.set(org.cause, averages.get(org.cause) + org.score);
          numCauses.set(org.cause, numCauses.get(org.cause) + 1);
        }
      }
    }
    Array.from(averages).map(([key, value]) => {
      averages.set(
        key,
        roundToHundredth(averages.get(key) / numCauses.get(key))
      );
    });
    let useableData: any[] = [];
    Array.from(averages).map(([key, value]) => {
      useableData.push({
        name: key,
        value: value,
      });
    });
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
          <PieChart width={400} height={600}>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
export default PieGraph;
