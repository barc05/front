import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Badge, Spinner, Alert } from 'react-bootstrap';

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const obtenerNotificaciones = async () => {
            try {
                
                setTimeout(() => {
                    const datosSimulados = [
                        { id: 1, tipo: "Alerta de Incendio", mensaje: "Incendio Forestal reportado a 5km de tu ubicación.", fecha: "Hace 10 minutos", estado: "NO_LEIDO" },
                        { id: 2, tipo: "Reporte Exitoso", mensaje: "Tu reporte de incendio estructural ha sido procesado.", fecha: "Hace 2 horas", estado: "LEIDO" },
                        { id: 3, tipo: "Sistema", mensaje: "Bienvenido a la plataforma de prevención de incendios Valle.", fecha: "Hace 1 día", estado: "LEIDO" }
                    ];
                    setNotificaciones(datosSimulados);
                    setCargando(false);
                }, 1000);

            } catch (err) {
                setError("No se pudieron cargar las notificaciones.");
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
                                    className={`p-3 ${noti.estado === 'NO_LEIDO' ? 'bg-light border-start border-danger border-4' : ''}`}
                                >
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="fw-bold">
                                            {noti.tipo}
                                            {noti.estado === 'NO_LEIDO' && <Badge bg="danger" className="ms-2">Nueva</Badge>}
                                        </div>
                                        <small className="text-muted">{noti.fecha}</small>
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