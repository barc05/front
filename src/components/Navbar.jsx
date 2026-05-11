import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-4">
            <Container>
                {/* Usamos un emoji en lugar de un icono de librería */}
                <Navbar.Brand href="/" className="fw-bold">
                    <span className="me-2"></span> 
                    VALLE DEL SOL
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Inicio</Nav.Link>
                        <Nav.Link href="/historial">Historial</Nav.Link>
                        <Nav.Link href="/emergencia" className="text-danger fw-bold"> EMERGENCIA</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}