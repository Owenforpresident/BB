import React, { useState, Fragment } from 'react';
import { logout } from '../actions/auth';
import { connect } from 'react-redux';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';

const Menu = ({ auth: { isAuthenticated }, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authLinks = (    
<NavItem>
<a onClick={logout} href='#!'>Logout</a>
</NavItem> 
  );

  const guestLinks = (
    <Fragment>
    <NavItem>
    <NavLink href="/Login">Login</NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="/Register">Register</NavLink>
  </NavItem> 
  </Fragment>
  );

 
    return (
        
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/dashboard">BB</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
           
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      
          </Nav>       
        </Collapse>
      </Navbar> 
        
    )
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Menu);
