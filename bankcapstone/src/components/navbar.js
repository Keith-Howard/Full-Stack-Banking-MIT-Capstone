import {Navbar, Nav, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import React from 'react';

function NavBar(){
    return(
  
      <Navbar bg="light" variant="light" expand="lg">
        <Container fluid>
          <Nav.Link as={Link} id="home" className="navbar-brand" style={{display: 'inline'}} to="/">First National Bank</Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Nav.Link as={Link} id="createAccount" style={{display: 'inline'}} to="/components/CreateAccount">Create Account</Nav.Link>
              <Nav.Link as={Link} id="login" style={{display: 'inline'}} to="/components/login">Login</Nav.Link>
              <Nav.Link as={Link} id="deposit" style={{display: 'none'}} to="/components/deposit">Deposit</Nav.Link>
              <Nav.Link as={Link} id="withdraw" style={{display: 'none'}} to="/components/withdraw">Withdraw</Nav.Link>
              <Nav.Link as={Link} id="balance" style={{display: 'none'}} to="/components/balance">Balance</Nav.Link>
              <Nav.Link as={Link} id="allData" style={{display: 'none'}} to="/components/alldata">All Data</Nav.Link>
              <Nav.Link as={Link} id="transHistory" style={{display: 'none'}} to="/components/transHistory">History</Nav.Link>
              <Nav.Link as={Link} id="logout" style={{display: 'none'}} to="/components/logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav.Link id="userName" className="nav-link" style={{display: 'none', fontWeight: 'bold'}}></Nav.Link>
        </Container>
      </Navbar>
    );
}
export default NavBar;