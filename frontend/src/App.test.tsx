import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import App from "./App";
import AboutUs from "./components/About";
import Header from "./components/Navigation";
import Countries from "./components/countries_pages/CountriesModelPage";
import Disasters from "./components/disasters_pages/DisastersModelPage";
import Organizations from "./components/organizations_pages/OrganizationsModelPage";
import Search from "./components/Search"

describe("Render Basic Components", () => {
  // Test 1
  test("App renders without crashing", () => {
    <BrowserRouter>
      render(
      <App />
      ); expect(screen.getByText('frontend_test')).toBeInTheDocument();
    </BrowserRouter>;
  });

  // Test 2
  test("About Us renders names without crashing", () => {
    <BrowserRouter>
      render(
      <AboutUs />
      ); 
      expect(screen.getByText('Ruchi Bhalani')).toBeInTheDocument();
      expect(screen.getByText('Dani Amir')).toBeInTheDocument();
      expect(screen.getByText('Anthony Modica')).toBeInTheDocument();
      expect(screen.getByText('Jonathan Debella')).toBeInTheDocument();
      expect(screen.getByText('Martin Nguyen')).toBeInTheDocument()
    </BrowserRouter>;
  });

  // Test 3
  test("About Us renders fully without crashing", () => {
    <BrowserRouter>
      render(
      <AboutUs />
      ); expect(screen.getByText('Tools')).toBeInTheDocument();
    </BrowserRouter>;
  });

  // Test 4
  test("NavBar renders without crashing", () => {
    <BrowserRouter>
      render(
      <Header />
      ); expect(screen.getByText('About')).toBeInTheDocument();
    </BrowserRouter>;
  });

  // Test 5
  test("NavBar renders fully without crashing", () => {
    <BrowserRouter>
      render(
      <Header />
      ); expect(screen.getByText('International Organizations')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Countries')).toBeInTheDocument();
      expect(screen.getByText('Disasters')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    </BrowserRouter>;
  });

  // Test 6
  test("Countries page renders without crashing", () => {
    <BrowserRouter>
      render(
      <Countries />
      ); expect(screen.getByText('Results Found')).toBeInTheDocument();
    </BrowserRouter>;
  });

  // // Test 7
  test("Countries page renders fully without crashing", () => {
    <BrowserRouter>
      render(
      <Countries />
      ); expect(screen.getByText('Rows')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Test 8
  test("Countries page renders filters without crashing", () => {
    <BrowserRouter>
      render(
      <Countries />
      ); expect(screen.getByText('Language')).toBeInTheDocument();
      expect(screen.getByText('Currency')).toBeInTheDocument();
      expect(screen.getByText('Region')).toBeInTheDocument();
      expect(screen.getByText('Subregion')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Test 9
  test("Countries page renders sorting without crashing", () => {
    <BrowserRouter>
      render(
      <Countries />
      ); expect(screen.getByText('Sort')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Populatiom')).toBeInTheDocument();
    </BrowserRouter>;
  });

  // // Test 10
  test("Disasters page renders without crashing", () => {
    <BrowserRouter>
      render(
      <Disasters />
      ); expect(screen.getByText('Results Found')).toBeInTheDocument();
    </BrowserRouter>;
  });

  // // Test 11
  test("Disasters page fully renders without crashing", () => {
    <BrowserRouter>
      render(
      <Disasters />
      ); expect(screen.getByText('Rows')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Test 12
  test("Disasters page renders filters without crashing", () => {
    <BrowserRouter>
      render(
      <Disasters />
      ); expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Disaster')).toBeInTheDocument();
      expect(screen.getByText('Month')).toBeInTheDocument();
      expect(screen.getByText('Affected Country')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Test 13
  test("Disasters page renders sorting without crashing", () => {
    <BrowserRouter>
      render(
      <Disasters />
      ); expect(screen.getByText('Sort')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Year')).toBeInTheDocument();
    </BrowserRouter>;
  });

  // Test 14
  test("Organizations page renders without crashing", () => {
    <BrowserRouter>
      render(
      <Organizations />
      ); expect(screen.getByText('Results Found')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Test 15
  test("Organizations page renders fully without crashing", () => {
    <BrowserRouter>
      render(
      <Organizations />
      ); expect(screen.getByText('Rows')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Test 16
  test("Organizations page renders filters without crashing", () => {
    <BrowserRouter>
      render(
      <Organizations />
      ); expect(screen.getByText('Rating')).toBeInTheDocument();
      expect(screen.getByText('Causes')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Test 17
  test("Organizations page renders sorting without crashing", () => {
    <BrowserRouter>
      render(
      <Organizations />
      ); expect(screen.getByText('Sort')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Score')).toBeInTheDocument();
      expect(screen.getByText('Total Income')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Search Tests
  //Test 18
  test("Disasters page renders Search without crashing", () => {
    <BrowserRouter>
      render(
      <Disasters />
      ); expect(screen.getByText('Search')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Test 19
  test("Countries page renders Search without crashing", () => {
    <BrowserRouter>
      render(
      <Countries />
      ); expect(screen.getByText('Search')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Test 20
  test("Organizations page renders Search without crashing", () => {
    <BrowserRouter>
      render(
      <Organizations />
      ); expect(screen.getByText('Search')).toBeInTheDocument();
    </BrowserRouter>;
  });

  //Test 21
  test("App renders search page without crashing", () => {
    <BrowserRouter>
      render(
      <Search />
      ); expect(screen.getByText('Search')).toBeInTheDocument();
    </BrowserRouter>;
  });
});
