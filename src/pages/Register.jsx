import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje({ texto: '', tipo: '' });


        if (!username.trim() || !email.trim() || !password.trim()) {
            setMensaje({ texto: 'Por favor, completa todos los campos.', tipo: 'warning' });
            return;
        }

        try {
            
            const response = await fetch('https://api-gateway-1w1b.onrender.com/api/v1/usuarios/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nombre: username,      
                    correo: email,         
                    contrasena: password   
                }),
            });

            
            if (response.ok) {
                setMensaje({ texto: '¡Usuario registrado con éxito! Redirigiendo al Login...', tipo: 'success' });
                
                
                setUsername('');
                setEmail('');
                setPassword('');

                
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
               
                try {
                    const data = await response.json();
                    
                    setMensaje({ texto: data.message || `Error del servidor (Código ${response.status})`, tipo: 'danger' });
                } catch (e) {
                    
                    setMensaje({ texto: `El servidor rechazó el registro. Código de error: ${response.status}`, tipo: 'danger' });
                }
            }
        } catch (error) {
           
            setMensaje({ texto: 'Error al conectar con el servidor.', tipo: 'danger' });
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className="shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4 fw-bold">Crear Cuenta</h3>
                
                {mensaje.texto && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre de Usuario</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Ej: ale_arucutipa"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="ejemplo@valle.cl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100 fw-bold">
                        REGISTRARSE
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}