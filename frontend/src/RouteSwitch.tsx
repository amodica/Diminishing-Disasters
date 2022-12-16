import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import DisastersModelPage from './components/disasters_pages/DisastersModelPage';
import OrganizationsModelPage from './components/organizations_pages/OrganizationsModelPage';
import OrganizationsInstance from './components/organizations_pages/OrganizationsInstance';
import About from './components/About';
import CountriesModelPage from './components/countries_pages/CountriesModelPage';
import CountriesInstance from './components/countries_pages/CountriesInstance';
import DisastersInstance from './components/disasters_pages/DisastersInstance';
import Search from './components/Search';
import Visualizations from './components/Visualizations';
import TheirVisualization from "./components/ProviderVisualizations";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/countries" element={<CountriesModelPage/>} />
                <Route path="/countries/:id" element={<CountriesInstance/>} />
                <Route path="/disasters" element={<DisastersModelPage/>} />
                <Route path="/disasters/:id" element={<DisastersInstance/>} />
                <Route path="/organizations" element={<OrganizationsModelPage/>} />
                <Route path="/organizations/:id" element={<OrganizationsInstance/>} />
                <Route path="/search" element={<Search/>} />
                <Route path="/visualizations" element={<Visualizations/>}/>
                <Route path="/provider-visualizations" element={<TheirVisualization />}/>
            </Routes>

      </BrowserRouter>
    );
}

export default RouteSwitch;
