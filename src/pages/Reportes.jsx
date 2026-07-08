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
            <h2 className="reportes-titulo">Historial de Reportes de Incendios</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="danger" />
                    <p>Cargando reportes...</p>
                </div>
            ) : (
                <div className="reportes-lista-contenedor">
                    {reportes.length === 0 ? (
                        <Alert variant="info" className="text-center">
                            No hay reportes de incendios registrados en el sistema.
                        </Alert>
                    ) : (
                        reportes.map((reporte, index) => (
                            <div className="reporte-item-linea" key={reporte.id || index}>
                                
                                {/* Columna 1: Tipo de Incendio */}
                                <div className="reporte-col-tipo">
                                    <span className="reporte-badge-rojo">
                                        {reporte.tipoIncendio}
                                    </span>
                                    <small className="reporte-id">ID: {reporte.id || index}</small>
                                </div>

                                {/* Columna 2: Ubicación / Coordenadas */}
                                <div className="reporte-col-ubicacion">
                                    <span><strong>Latitud:</strong> {reporte.latitud}</span>
                                    <span><strong>Longitud:</strong> {reporte.longitud}</span>
                                </div>

                                {/* Columna 3: Fecha del Suceso */}
                                <div className="reporte-col-fecha">
                                    {reporte.fechaReporte ? (
                                        <span><strong>Fecha:</strong> {new Date(reporte.fechaReporte).toLocaleString()}</span>
                                    ) : (
                                        <span className="sin-fecha">Sin fecha registrada</span>
                                    )}
                                </div>

                            </div>
                        ))
                    )}
                </div>
            )}
        </Container>
    );
};

export default Reportes;