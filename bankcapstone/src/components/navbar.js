import { NavLink } from 'react-router-dom';
//import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';

function NavBar(){
    return(
  
      <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink id="home" className="navbar-brand" style={{display: 'inline'}} to="/">First National Bank</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink id="createAccount" className="nav-link" style={{display: 'inline'}} to="/components/CreateAccount">Create Account</NavLink>
            </li>
            <li className="nav-item">
              <NavLink id="login" className="nav-link" style={{display: 'inline'}} to="/components/login">Login</NavLink>
            </li>
              <li className="nav-item">
                <NavLink id="deposit" className="nav-link" style={{display: 'none'}} to="/components/deposit">Deposit</NavLink>
              </li>
              <li className="nav-item">
                <NavLink id="withdraw" className="nav-link" style={{display: 'none'}} to="/components/withdraw">Withdraw</NavLink>
              </li>
              <li className="nav-item">
                <NavLink id="balance" className="nav-link" style={{display: 'none'}} to="/components/balance">Balance</NavLink>
              </li>
              <li className="nav-item">
                <NavLink id="allData" className="nav-link" style={{display: 'none'}} to="/components/alldata">All Data</NavLink>
              </li>
              <li className="nav-item">
                <NavLink id="transHistory" className="nav-link" style={{display: 'none'}} to="/components/transHistory">Transaction History</NavLink>
              </li>
              <li className="nav-item">
                <NavLink id="logout" className="nav-link" style={{display: 'none'}} to="/components/logout">Log Out</NavLink>
              </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink id="userName" className="nav-link" style={{display: 'none', fontWeight: 'bold'}}></NavLink>
            </li> 
          </ul>
        </div>
      </Navbar>
  
    );
}
export default NavBar;