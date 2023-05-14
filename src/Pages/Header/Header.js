import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <div className="logo">
                        <Link to="/">Signup.com</Link>
                    </div>
                    <div className="nav-just">
                        <Nav className="me-auto">
                            <NavLink to="/">Home</NavLink>
                            <NavLink className={({ isActive }) => isActive ? 'active' : undefined} to="/register">Register</NavLink>
                            <NavLink to="/login">Login</NavLink>
                        </Nav>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;