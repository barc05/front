// barc05/front/front-develop/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
  const navigate = useNavigate();
  // Comprobamos si el usuario está autenticado verificando si existe el token
  const token = localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token'); // Borramos el token para cerrar sesión
    navigate('/login'); // Redirigimos al inicio de sesión
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* El botón de la marca lleva a la página principal */}
        <Navbar.Brand as={Link} to="/">Gestión de Incendios</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            
            {/* Enlace que siempre se muestra para ir al mapa/inicio */}
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>

            {/* Condición: Si NO hay token, mostramos los botones de ingresar y registrarse */}
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                
                {/* --- AQUÍ AÑADIMOS EL ENLACE DE REGISTRO --- */}
                <Nav.Link as={Link} to="/register">
                  <Button variant="outline-success" size="sm">Registrarse</Button>
                </Nav.Link>
              </>
            ) : (
              // Si el usuario YA inició sesión, le mostramos el botón de salir
              <Button variant="outline-danger" size="sm" onClick={handleLogout} className="ms-2">
                Cerrar Sesión
              </Button>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;