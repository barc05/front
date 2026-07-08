import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { obtenerReportes } from '../service/reporteService';
import './Reportes.css';

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
        <Container className="mt-4">
            <h2 className="admin-tabla-titulo">Historial de Reportes</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="danger" />
                    <p>Cargando reportes...</p>
                </div>
            ) : (
                <div className="admin-tabla-wrapper">
                    {reportes.length === 0 ? (
                        <Alert variant="info" className="text-center m-3">
                            No hay reportes registrados en el sistema.
                        </Alert>
                    ) : (
                        <div className="admin-grid-container">
                            
                            <div className="admin-grid-header">
                                <div className="admin-grid-celda">ID</div>
                                <div className="admin-grid-celda">Tipo de Incendio</div>
                                <div className="admin-grid-celda">Latitud</div>
                                <div className="admin-grid-celda">Longitud</div>
                                <div className="admin-grid-celda">Fecha y Hora</div>
                            </div>

                            <div className="admin-grid-body">
                                {reportes.map((reporte, index) => (
                                    <div className="admin-grid-fila" key={reporte.id || index}>
                                        <div className="admin-grid-celda celda-id">
                                            #{reporte.id || index}
                                        </div>
                                        <div className="admin-grid-celda celda-tipo">
                                            {reporte.tipoIncendio}
                                        </div>
                                        <div className="admin-grid-celda celda-coordenada">
                                            {reporte.latitud}
                                        </div>
                                        <div className="admin-grid-celda celda-coordenada">
                                            {reporte.longitud}
                                        </div>
                                        <div className="admin-grid-celda celda-fecha">
                                            {reporte.fechaReporte ? (
                                                new Date(reporte.fechaReporte).toLocaleString()
                                            ) : (
                                                <span className="text-muted">--/--/----</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}
                </div>
            )}
        </Container>
    );
};

export default Reportes;