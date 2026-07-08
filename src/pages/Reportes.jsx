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
            <h2 className="tabla-reportes-titulo">Historial de Reportes</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="danger" />
                    <p>Cargando reportes...</p>
                </div>
            ) : (
                <div className="tabla-reportes-contenedor">
                    {reportes.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            No hay reportes registrados en el sistema.
                        </Alert>
                    ) : (
                        <>
                            <div className="tabla-reportes-header">
                                <div className="tabla-celda col-id">ID</div>
                                <div className="tabla-celda col-tipo">Tipo de Incendio</div>
                                <div className="tabla-celda col-coordenadas">Latitud</div>
                                <div className="tabla-celda col-coordenadas">Longitud</div>
                                <div className="tabla-celda col-fecha">Fecha y Hora</div>
                            </div>

                            {/* Filas de la lista */}
                            <div className="tabla-reportes-body">
                                {reportes.map((reporte, index) => (
                                    <div className="tabla-reportes-fila" key={reporte.id || index}>
                                        <div className="tabla-celda col-id fw-bold">
                                            #{reporte.id || index}
                                        </div>
                                        <div className="tabla-celda col-tipo text-uppercase text-danger fw-semibold">
                                            {reporte.tipoIncendio}
                                        </div>
                                        <div className="tabla-celda col-coordenadas text-muted">
                                            {reporte.latitud}
                                        </div>
                                        <div className="tabla-celda col-coordenadas text-muted">
                                            {reporte.longitud}
                                        </div>
                                        <div className="tabla-celda col-fecha text-secondary">
                                            {reporte.fechaReporte ? (
                                                new Date(reporte.fechaReporte).toLocaleString()
                                            ) : (
                                                <span className="text-muted italic">--/--/----</span>
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