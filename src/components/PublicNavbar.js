import React, { useEffect, useState } from "react";
import {Navbar, Container, FormControl, Nav, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import productActions from '../redux/actions/product.action';
import {useHistory} from 'react-router-dom';

const PublicNavbar = () => {
    const [query, setQuery] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const limit = 10;

    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);
    }

    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(productActions.getAllProducts({pageNum, limit, query}));
        history.push("/product");
    }

    return (
        <div>
           <Navbar bg="dark" expand="lg" variant="dark">
            <Container fluid style={{marginLeft:"2vw", marginRight:"2vw"}}>
                <Navbar.Brand as={NavLink} to="/" className="logo">plato</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link as={NavLink} to="/" className="nav-tab">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/product" className="nav-tab">Products</Nav.Link>
                    {/* <Nav.Link as={NavLink} to="/profile">Profile Page</Nav.Link> */}
                </Nav>
                <Form className="d-flex" onSubmit={handleSubmit}>
                    <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleSearchChange}
                    style={{backgroundColor:"lightgrey"}}
                    />
                    <Button as={NavLink} to="/product" onClick={handleSubmit} variant="outline-secondary">Search</Button>
                </Form>
                <Nav.Link as={NavLink} to="/register" className="nav-left nav-tab">Sign up</Nav.Link>
                <Nav.Link as={NavLink} to="/login"className="nav-left nav-tab">Log in</Nav.Link>
                <Nav.Link as={NavLink} to="/cart" className="nav-tab">
                <FontAwesomeIcon icon={faShoppingCart} />
                </Nav.Link>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}

export default PublicNavbar
