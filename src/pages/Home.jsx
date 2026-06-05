// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { obtenerUbicacionActual } from "../utils/geo";
import { useNavigate } from 'react-router-dom';
import { enviarReporteIncendio } from "../service/reporteService";

export default function Home() {
    const navigate = useNavigate();
    const [reporte, setReporte] = useState({
        latitud: "",
        longitud: "",
        tipoIncendio: "Forestal"
    });
    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            setMensaje({ texto: "Acceso denegado. Inicia sesión para reportar un incidente.", tipo: "danger" });
            
            // Si no está logueado, lo expulsa al Login después de 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }

        // Si está logueado, procede a buscar su ubicación GPS
        capturarUbicacion();
    }, [navigate]);

    // Permite cambiar el tipo de incendio en el Select
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReporte((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const capturarUbicacion = async () => {
        try {
            const coords = await obtenerUbicacionActual();
            setReporte(prev => ({ ...prev, ...coords }));
            setMensaje({ texto: "Ubicación detectada correctamente", tipo: "info" });
        } catch (error) {
            setMensaje({ texto: "Error al obtener GPS. Activa los permisos.", tipo: "warning" });
        }
    };

    useEffect(() => {
        capturarUbicacion();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await enviarReporteIncendio(reporte);
            setMensaje({ texto: "¡Reporte enviado con éxito!", tipo: "success" });
        } catch (error) {
            setMensaje({ texto: "Error al conectar con el servidor", tipo: "danger" });
        }
    };

    return (
        <Container className="mt-5 pt-5">
            <div className="mx-auto" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4 fw-bold">Nuevo Reporte</h2>
                
                {mensaje.texto && (
                    <Alert variant={mensaje.tipo} className="text-center">
                        {mensaje.texto}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
                    <Form.Group className="mb-3">
                        <Form.Label>Latitud</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="latitud" 
                            value={reporte.latitud} 
                            readOnly 
                            className="bg-light"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Longitud</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="longitud" 
                            value={reporte.longitud} 
                            readOnly 
                            className="bg-light"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Tipo de Incendio</Form.Label>
                        <Form.Select 
                            name="tipoIncendio" 
                            value={reporte.tipoIncendio} 
                            onChange={handleChange}
                        >
                            <option value="Forestal">Forestal</option>
                            <option value="Estructural">Estructural</option>
                            <option value="Vehicular">Vehicular</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="danger" type="submit" className="w-100 fw-bold">
                        ENVIAR REPORTE
                    </Button>
                </Form>
            </div>
        </Container>
    );
}
