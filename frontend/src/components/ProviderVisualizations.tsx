import React from "react";
import Navigation from "./Navigation";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { PieChart, Pie, Cell, ScatterChart, Scatter } from "recharts";
import "../styles/ProviderVisualizations.css";
import { Plane } from  'react-loader-spinner'


// Code inspired by Music Now
// https://gitlab.com/brandtswan/musicnow/-/tree/dev/frontend/src/views/Visualizations/OurVisualizations

type CountyResponse = {
  endIdx: number;
  list: county[];
};

type county = {
  demographic: string;
  emissions: number;
  ethnicity: string;
  id: number;
  img_url: string;
  income: number;
  info: string;
  name: string;
  numOfficials: number;
  population: number;
  state: string;
};

type FacilityResponse = {
  endIdx: number;
  list: facility[];
};

type facility = {
  emissions: number;
  facilityID: string;
  id: number;
  location: string;
  m10: number;
  m11: number;
  m12: number;
  m13: number;
  m14: number;
  m15: number;
  m16: number;
  m17: number;
  m18: number;
  m19: number;
  mostcommonemission: string;
  name: string;
  openlandfill: string;
  parentc: string;
  sector: string;
};

type barGraph = {
  ethnicity: string;
  counties: number;
};

type emissions_pie_chart = {
  mostcommonemission: string;
  facilities: number;
};

type props = {};

type state = {
  countyData: barGraph[];
  facilityData: emissions_pie_chart[];
  thirdData: county[];
  showLoader: boolean;
};

class TheirVisualization extends React.Component<props, state> {
  state: state = {
    countyData: [],
    facilityData: [],
    thirdData: [],
    showLoader: true
  };

  

  mapCounties(aut: county[]) {
    console.log("Test 1");

    let retArray: barGraph[] = [];

    aut.forEach(function (value) {
      let needToAdd = true;

      retArray.forEach(function (val2) {
        if (val2.ethnicity === value.ethnicity) {
          val2.counties = val2.counties + 1;
          needToAdd = false;
        }
      });

      if (needToAdd === true) {
        retArray.push({
          ethnicity: value.ethnicity,
          counties: 1,
        });
      }
    });
    console.log("Test 2");
    return retArray.slice(0, retArray.length - 1);
  }

  mapFacilities(aut: facility[]) {
    console.log("Test 3");

    let retArray: emissions_pie_chart[] = [];

    aut.forEach(function (value) {
      let needToAdd = true;

      retArray.forEach(function (val2) {
        if (val2.mostcommonemission === value.mostcommonemission) {
          val2.facilities = val2.facilities + 1;
          needToAdd = false;
        }
      });

      if (needToAdd === true) {
        retArray.push({
          mostcommonemission: value.mostcommonemission,
          facilities: 1,
        });
      }
    });
    console.log("Test 4");
    return retArray;
  }

  async componentDidMount() {
    const counties: CountyResponse = await fetch(
      "https://api.findingfootprints.me/counties?page=1&per_page=3142"
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });

    const facilities: FacilityResponse = await fetch(
      "https://api.findingfootprints.me/facilities?page=0&per_page=267"
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
        return {};
      });

    console.log("Test 5");

    this.setState({
      countyData: this.mapCounties(counties.list as county[]),
      facilityData: this.mapFacilities(facilities.list as facility[]),
      thirdData: counties.list as county[],
      showLoader: false
    });
    console.log("Test 6");
  }

  COLORS = [
    "#B0C4DE",
    "#87CEFA",
    "#6495ED",
    "#4169E1",
    "#1E90FF",
    "#21ABCD",
    "#080484",
  ];

  private myRef: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return (
      <div>
        <Navigation />
        <div className="centered">
                <h2>Provider Visualizations</h2>
            </div>
        {this.state.showLoader ? (
        <div className="spinner">
            <h2>Loading...</h2>
            <Plane
                // height="100"
                // width="100"
                color='#87CEFA'
                ariaLabel='loading'
            />
        </div>
        ) : (
            <div className="chart-container">
            
            <div>
                <h3>Amount of Emissions by Average Income of County</h3>
            </div>
            <div>
                <ResponsiveContainer width={1000} height="100%">
                <div>
                    <ScatterChart
                    width={1000}
                    height={400}
                    margin={{
                        top: 20,
                        right: 40,
                        bottom: 20,
                        left: 50,
                    }}
                    >
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis
                        type="number"
                        label={{ value: "Emissions", position: "insideBottom" }}
                        domain={[0, 4600000]}
                        dataKey="emissions"
                        name="Emissions"
                    />
                    <YAxis
                        type="number"
                        label={{
                        value: "Income",
                        position: "insideLeft",
                        angle: -90,
                        offset: -20
                        }}
                        dataKey="income"
                        name="Income"
                    />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter
                        name="Emissions by Income"
                        data={this.state.thirdData}
                        fill={this.COLORS[2]}
                    ></Scatter>
                    </ScatterChart>
                </div>
                </ResponsiveContainer>
            </div>

            <div>
                <h3>Number of Facilities by Most Common Emission</h3>
            </div>
            <div>
                <ResponsiveContainer width="100%" height={700}>
                <PieChart width={300} height={200}>
                <Legend
                        payload={this.state.facilityData.map((item, index) => ({
                        id: item.mostcommonemission,
                        type: "circle",
                        value: `${item.mostcommonemission} (${item.facilities})`,
                        color: this.COLORS[index % this.COLORS.length],
                        }))}
                    />
                    <Tooltip />
                    <Pie
                    data={this.state.facilityData}
                    nameKey="mostcommonemission"
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={true}
                    outerRadius={300}
                    fill={this.COLORS[2]}
                    dataKey="facilities"
                    
                    >
                    {this.state.facilityData.map((val, index) => (
                        <Cell
                        key={`cell-${val.facilities}`}
                        fill={this.COLORS[index % this.COLORS.length]}
                        />
                    ))}
                    </Pie>
                </PieChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h3>Number of Counties per Second Largest Ethnic Group</h3>
            </div>
            <div>
                <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={300}
                    height={200}
                    data={this.state.countyData}
                    margin={{ top: 10, right: 50, left: 0, bottom: 50 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ethnicity"></XAxis>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="counties" fill={this.COLORS[2]} />
                </BarChart>
                </ResponsiveContainer>
            </div>
            </div>
        )}
        
      </div>
    );
  }
}


export default TheirVisualization;
