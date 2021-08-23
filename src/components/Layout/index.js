import React from 'react';
import Header from '../Header';
import { Row, Col, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import './style.css'
function Layout(props) {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col md={2} className='sidebar' >
                                <ul>
                                    <li><NavLink className='nav-link' exact to={'/'}>Home</NavLink></li>
                                    <li><NavLink className='nav-link' to={'/page'}>Page</NavLink></li>
                                    <li><NavLink className='nav-link' to={'/products'}>Products</NavLink></li>
                                    <li><NavLink className='nav-link' to={'/orders'} >Orders</NavLink></li>
                                    <li><NavLink className='nav-link' to={'/category'} >Categories</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} style={{ marginLeft: 'auto', paddingTop: '60px' }} >{props.children}</Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }

        </>
    )
}

export default Layout
