import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';

const NavigationBar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); 
  const rol = localStorage.getItem('rol');

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('correo');
    localStorage.removeItem('rol');
    navigate('/login'); 
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Gestión de Incendios</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>

            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="outline-success" size="sm">Registrarse</Button>
                </Nav.Link>
              </>
            ) : (
              <>
                {rol === 'FUNCIONARIO' && (
                  <Nav.Link as={Link} to="/enviar-alerta" style={{ color: '#ffc107', fontWeight: 'bold' }}>
                    ⚠️ Enviar Alerta Masiva
                  </Nav.Link>
                )}

                <Nav.Link as={Link} to="/notificaciones">Notificaciones</Nav.Link>
                <Nav.Link as={Link} to="/reportes">Historial de Reportes</Nav.Link>

                <Button variant="outline-danger" size="sm" onClick={handleLogout} className="ms-3">
                  Cerrar Sesión
                </Button>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;