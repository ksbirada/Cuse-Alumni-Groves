import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from "./assets/ca.jpeg";

import {
  RiNewspaperLine,
  RiRadarLine,
  RiBaseStationLine,
  RiFolderUserLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

import styles from "./styles/NewsFeed.module.css";

function NewsFeed() {
  console.log("abc")
    /*let navigate = useNavigate();

  function handleClick(e) {
    navigate("/newsfeed/allaccounts");
  }

  function handleSignOut(e) {
    localStorage.removeItem("psnUserId");
    localStorage.removeItem("psnToken");
    localStorage.removeItem("psnUserFirstName");
    localStorage.removeItem("psnUserLastName");
    localStorage.removeItem("psnUserEmail");
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("psnToken") === null) {
      navigate("/unauthorized");
    }
  });
*/
  return (
    <Container className="pt-3">
      <Row className="mb-3">
        <Col md={6}>
          <Row className="justify-content-center align-items-center">
            <Col md="auto" className="text-sm-start text-center mb-sm-0 mb-3">
              <img src={logo} width="125" alt="logo" />
            </Col>
            <Col className="text-sm-start text-center mb-sm-0 mb-3">
              <h3>Cuse Alumni Groves</h3>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <Button variant="success" >
              Find All User Accounts
            </Button>
            {/* </Button> Replace with search bar */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Navbar bg="light" expand="lg" className="mb-3 mb-sm-0">
            <Container className={styles.navbarContainer}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className={styles.navContainer}>
                <ul className="list-group">
                <Nav.Link>
                  <Link to="" className="text-decoration-none">
                  <li className={`list-group-item fs-5 py-3 shadow ${styles.textcolor}`}>
                      <span>
                        {" "}
                        <RiNewspaperLine /> Newsfeed
                      </span>
                    </li>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="myprofile" className="text-decoration-none">
                  <li className={`list-group-item fs-5 py-3 shadow ${styles.textcolor}`}>
                      <span>
                        <RiFolderUserLine /> My Posts
                      </span>
                    </li>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <li className={`list-group-item fs-5 py-3 shadow ${styles.signOutButton} ${styles.textcolor}`}>
                    <span>
                      <RiLogoutBoxLine /> Sign Out
                    </span>
                  </li>
                </Nav.Link>
                </ul>
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
        <Col md={8}>
          <Outlet />{" "}
        </Col>
      </Row>
    </Container>
  );
}

export default NewsFeed;
