import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { obtenerReportes } from '../service/reporteService';

const Reportes = () => {
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
    const cargarReportes = async () => {
        try {
            const data = await obtenerReportes();
            
            if (Array.isArray(data)) {
                setReportes(data.reverse()); 
            } else {
                setReportes([]); 
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    cargarReportes();
}, []);
    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center">Últimos Reportes de Incendios</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="danger" />
                    <p>Cargando reportes...</p>
                </div>
            ) : (
                <Row>
                    {reportes.length === 0 ? (
                        <Col>
                            <Alert variant="info" className="text-center">
                                No hay reportes de incendios registrados en el sistema.
                            </Alert>
                        </Col>
                    ) : (
                        reportes.map((reporte, index) => (
                            <Col md={6} lg={4} className="mb-4" key={reporte.id || index}>
                                <Card className="h-100 shadow-sm border-danger">
                                    <Card.Header className="bg-danger text-white fw-bold text-uppercase">
                                         {reporte.tipoIncendio}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            <strong>Latitud:</strong> {reporte.latitud} <br />
                                            <strong>Longitud:</strong> {reporte.longitud} <br />
                                            {/* Si tu backend envía la fecha, se renderiza aquí */}
                                            {reporte.fechaReporte && (
                                                <>
                                                    <hr />
                                                    <strong>Fecha:</strong> {new Date(reporte.fechaReporte).toLocaleString()}
                                                </>
                                            )}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            )}
        </Container>
    );
};

export default Reportes;