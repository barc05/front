import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4">
            <Container>
                <Navbar.Brand href="/" className="fw-bold">
                    VALLE DEL SOL
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/historial">Historial</Nav.Link>
                        <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
                        <Nav.Link href="/emergencia" className="text-danger fw-bold"> EMERGENCIA</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
