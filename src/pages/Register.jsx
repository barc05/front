import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Al agregar "export default function", arreglas el error de la consola
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
            // Mandamos la petición al Gateway
            const response = await fetch('https://api-gateway-1w1b.onrender.com/api/v1/usuarios/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                setMensaje({ texto: '¡Usuario registrado con éxito! Redirigiendo...', tipo: 'success' });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                try {
                    const data = await response.json();
                    setMensaje({ texto: data.message || 'Error al registrar.', tipo: 'danger' });
                } catch (e) {
                    setMensaje({ texto: 'Error en el servidor (Código ' + response.status + ').', tipo: 'danger' });
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
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100 fw-bold">
                        REGISTRARSE
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}