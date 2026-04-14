import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchByKeyword = (e) => {
    e.preventDefault();
    navigate(`movies?q=${encodeURIComponent(keyword)}`);
    setKeyword("");
  };

  return (
    <div className="app-shell">
      <Navbar expand="lg" className="app-navbar">
        <Container fluid className="app-navbar__inner">
          <Navbar.Brand as={NavLink} to="/" className="app-logo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/3840px-Netflix_2015_logo.svg.png"
              alt="Netflix"
              className="app-logo__image"
            />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="main-navbar-nav"
            className="app-navbar__toggle"
          />

          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="app-nav me-auto">
              <NavLink to="/" end className="app-nav__link">
                Home
              </NavLink>
              <NavLink to="/movies" className="app-nav__link">
                Movies
              </NavLink>
            </Nav>

            <Form className="app-search" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="app-search__input"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                type="submit"
                variant="outline-danger"
                className="app-search__button"
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default AppLayout;
