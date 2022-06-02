import { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../Assets/NavLogo.png";
import AuthContext from "../../Store/auth-context";

const MainNavbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    localStorage.removeItem("userEmail");
  };

  return (
    <Navbar sticky="top" expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="navbarLogo">
          <img src={logo} alt="logo" id="logo" style={{ width: "50%" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#cardImg" className="link">
              Most rated
            </Nav.Link>
            <Nav.Link as={Link} to="/beer" className="link">
              Beer
            </Nav.Link>
          </Nav>
          <Nav>
            {!isLoggedIn && (
              <Nav.Link href="/register" className="link">
                Login
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link href="/profile" className="link">
                Profile
              </Nav.Link>
            )}
            {isLoggedIn && (
              <Nav.Link href="/" onClick={logoutHandler} className="link">
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
