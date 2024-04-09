import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const DashBoard = () => {;
  return (
    <div className="dashboard">
      <Navbar
        collapseOnSelect
        bg="light"
        expand="lg"
        style={{
          background: "linear-gradient(to right, #1877f2, #f1f1f1)",
          backgroundColor: "#1877f2",
        }}
      >
        <Container fluid>
          <Navbar.Brand href="/" style={{ textAlign: "left" }}>
            <span style={{ color: "white", fontSize: "30px" }}>Home</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#features" style={{ color: "white" }}>
                Features
              </Nav.Link>
              <Nav.Link href="#pricing" style={{ color: "white" }}>
                Pricing
              </Nav.Link>
              <Nav.Link href="#about" style={{ color: "white" }}>
                About
              </Nav.Link>
              {/* Add more Nav.Link elements for additional links */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1>Welcome to Dashboard</h1>
      </div>
    </div>
  );
};

export default DashBoard;
