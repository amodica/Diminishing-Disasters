import Navigation from "./Navigation";
import BarGraph from "./visualizations/BarGraph";
import PieGraph from "./visualizations/PieChart";
import IncomeChart from "./visualizations/IncomeChart";
import "../styles/Visualizations.css";

const Visualizations = () => {
  return (
    <div>
      <Navigation />
      <div>
        <h2 className="center-text">Our Visualizations</h2>
        <h3>Average Organization Score by Cause</h3>
        <PieGraph />
        <h3>Top Ten Organizations by Total Income</h3>
        <IncomeChart />
        <h3>Top Ten Countries by Number of Disasters</h3>
        <BarGraph />
      </div>
    </div>
  );
};
export default Visualizations;
