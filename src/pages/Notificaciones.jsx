// src/pages/Notificaciones.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Badge, Spinner, Alert } from 'react-bootstrap';

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerNotificaciones = async () => {
            // Obtenemos el correo del usuario logueado desde el localStorage
            const correo = localStorage.getItem('correo');
            
            if (!correo) {
                setError("No se pudo identificar al usuario.");
                setCargando(false);
                return;
            }

            try {
                // LLAMADA REAL A TU MICROSERVICIO
                const response = await fetch(`https://ms-notificaciones-api.onrender.com/api/notificaciones/mis-alertas/${correo}`);
                
                if (!response.ok) throw new Error("Error al obtener alertas");
                
                const datos = await response.json();
                setNotificaciones(datos);
            } catch (err) {
                setError("No se pudieron cargar las notificaciones. Intenta más tarde.");
                console.error(err);
            } finally {
                setCargando(false);
            }
        };

        obtenerNotificaciones();
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Mis Notificaciones</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            {cargando ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="danger" />
                    <p>Cargando alertas...</p>
                </div>
            ) : (
                <Card className="shadow-sm">
                    <ListGroup variant="flush">
                        {notificaciones.length === 0 ? (
                            <ListGroup.Item className="text-center text-muted p-4">
                                No tienes notificaciones nuevas.
                            </ListGroup.Item>
                        ) : (
                            notificaciones.map((noti) => (
                                <ListGroup.Item 
                                    key={noti.id} 
                                    className={`p-3 ${!noti.leido ? 'bg-light border-start border-danger border-4' : ''}`}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="fw-bold">
                                            Alerta de Incendio
                                            {!noti.leido && <Badge bg="danger" className="ms-2">Nueva</Badge>}
                                        </div>
                                        <small className="text-muted">
                                            {new Date(noti.createdAt).toLocaleDateString()}
                                        </small>
                                    </div>
                                    <p className="mb-0 mt-1 text-secondary">{noti.mensaje}</p>
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                </Card>
            )}
        </Container>
    );
};

export default Notificaciones;