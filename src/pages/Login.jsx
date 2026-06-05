import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
    
    // Herramienta para redirigir al usuario después de loguearse
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje({ texto: '', tipo: '' });

        // 1. VALIDACIÓN FRONTEND (Requisito de la rúbrica)
        if (!email.trim() || !password.trim()) {
            setMensaje({ texto: 'Por favor, completa todos los campos.', tipo: 'warning' });
            return;
        }

        try {
            // 2. CONEXIÓN AL API GATEWAY
            const response = await fetch('https://api-gateway-1w1b.onrender.com/api/v1/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // 3. GUARDAR EL TOKEN VIP
                localStorage.setItem('token', data.token);
                
                setMensaje({ texto: "¡Inicio de sesión correcto!", tipo: "success" });

                // Redirigimos a la página principal de reportes
                setTimeout(() => navigate('/'), 1500);
            } else {
                setMensaje({ texto: 'Credenciales inválidas. Intenta de nuevo.', tipo: 'danger' });
            }
        } catch (error) {
            setMensaje({ texto: 'Error al conectar con el servidor.', tipo: 'danger' });
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className="shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4 fw-bold">Iniciar Sesión</h3>
                
                {mensaje.texto && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="ejemplo@valle.cl"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 fw-bold">
                        ENTRAR
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}