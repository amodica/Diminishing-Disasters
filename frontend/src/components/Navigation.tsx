import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import "../styles/Navigation.css";

const Navigation = () => {
  return (
    <Navbar expand="lg" className="nav-container" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="nav-title text-light">
          Diminishing Disasters
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="text-light nav-link" href="/">
              Home
            </Nav.Link>

            <Nav.Link className="text-light nav-link" href="/about">
              About
            </Nav.Link>

            <Nav.Link className="text-light nav-link" href="/countries">
              Countries
            </Nav.Link>

            <Nav.Link className="text-light nav-link" href="/disasters">
              Disasters
            </Nav.Link>

            <Nav.Link className="text-light nav-link" href="/organizations">
              Organizations
            </Nav.Link>

            <Nav.Link className="text-light nav-link" href="/visualizations">
              Visualizations
            </Nav.Link>
            
            <Nav.Link className="text-light nav-link" href="/provider-visualizations">
              Provider Visualizations
            </Nav.Link>

            <Nav.Link className="text-light nav-link" href="/search">
              Search
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
