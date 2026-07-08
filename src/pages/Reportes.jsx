import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
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
            <h2 className="grid-reportes-titulo">Historial de Reportes</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="danger" />
                    <p>Cargando reportes...</p>
                </div>
            ) : (
                <div className="grid-reportes-tabla">
                    {reportes.length === 0 ? (
                        <Alert variant="info" className="text-center m-3">
                            No hay reportes registrados en el sistema.
                        </Alert>
                    ) : (
                        <>
                            <div className="grid-reportes-fila grid-reportes-header">
                                <div className="grid-celda">ID</div>
                                <div className="grid-celda">Tipo de Incendio</div>
                                <div className="grid-celda">Latitud</div>
                                <div className="grid-celda">Longitud</div>
                                <div className="grid-celda">Fecha y Hora</div>
                            </div>

                            {/* Filas de Datos */}
                            <div className="grid-reportes-body">
                                {reportes.map((reporte, index) => (
                                    <div className="grid-reportes-fila grid-reportes-item" key={reporte.id || index}>
                                        <div className="grid-celda fw-bold text-secondary">
                                            #{reporte.id || index}
                                        </div>
                                        <div className="grid-celda text-uppercase text-danger fw-semibold">
                                            {reporte.tipoIncendio}
                                        </div>
                                        <div className="grid-celda text-muted">
                                            {reporte.latitud}
                                        </div>
                                        <div className="grid-celda text-muted">
                                            {reporte.longitud}
                                        </div>
                                        <div className="grid-celda text-dark">
                                            {reporte.fechaReporte ? (
                                                new Date(reporte.fechaReporte).toLocaleString()
                                            ) : (
                                                <span className="text-muted">--/--/----</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </Container>
    );
};

export default Reportes;