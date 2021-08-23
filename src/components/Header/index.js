import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { signout } from '../../actions';

function Header() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(signout());
    }
    const renderLoggedIn = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <span className='nav-link' onClick={logout}>Signout</span>
                </li>
                {/* <Nav.Link href="#deets">Login</Nav.Link> */}
                {/* <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link> */}
            </Nav>
        )
    }
    const renderNonLoggedIn = () => {
        return (
            <Nav>
                <li className='nav-item'>
                    <NavLink className='nav-link' to='/signin'>Login</NavLink>
                </li>
                {/* <li className='nav-item'>
                    <NavLink className='nav-link' to='/signup'>Register</NavLink>
                </li> */}


                {/* <Nav.Link href="#deets">Login</Nav.Link> */}
                {/* <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link> */}
            </Nav>
        )

    }
    return (
        <Navbar collapseOnSelect fixed='top' expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }} >
            <Container fluid>
                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Link to='/' className='navbar-brand'>Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    {auth.authenticate ? renderLoggedIn() : renderNonLoggedIn()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
