import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from 'react-bootstrap';

export default function Home() {
    const [reporte, setReporte] = useState({
        latitud: "",
        longitud: "",
        tipoIncendio: "Forestal"
    });

    const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

    // FUNCIÓN PARA CAPTURAR GPS AUTOMÁTICAMENTE
    const capturarUbicacion = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setReporte(prev => ({
                        ...prev,
                        latitud: position.coords.latitude.toFixed(6),
                        longitud: position.coords.longitude.toFixed(6)
                    }));
                    setMensaje({ texto: "Ubicación detectada automáticamente", tipo: "info" });
                },
                (error) => {
                    console.error("Error obteniendo ubicación:", error);
                    setMensaje({ texto: "Por favor, permite el acceso al GPS para reportar.", tipo: "warning" });
                }
            );
        }
    };

    // Esto intenta capturar la ubicación apenas la persona entra a la página
    useEffect(() => {
        capturarUbicacion();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReporte({ ...reporte, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // El envío sigue siendo el mismo hacia tu API en puerto 8081
        const datosParaEnviar = {
            latitud: parseFloat(reporte.latitud),
            longitud: parseFloat(reporte.longitud),
            tipoIncendio: reporte.tipoIncendio
        };

        try {
            const response = await fetch("http://localhost:8081/api/reportes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosParaEnviar),
            });

            if (response.ok) {
                setMensaje({ texto: "¡Reporte guardado con éxito!", tipo: "success" });
            }
        } catch (error) {
            setMensaje({ texto: "Error de conexión con la API", tipo: "danger" });
        }
    };

    return (
        <Container className="my-5" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4">Nuevo Reporte de Incendio</h2>
            
            {mensaje.texto && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Latitud (Auto-detectada)</Form.Label>
                    <Form.Control 
                        type="text" name="latitud" 
                        value={reporte.latitud} readOnly 
                        placeholder="Obteniendo..."
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Longitud (Auto-detectada)</Form.Label>
                    <Form.Control 
                        type="text" name="longitud" 
                        value={reporte.longitud} readOnly 
                        placeholder="Obteniendo..."
                    />
                </Form.Group>

                <Button variant="outline-secondary" size="sm" className="mb-3" onClick={capturarUbicacion}>
                    🔄 Actualizar mi ubicación
                </Button>

                <Form.Group className="mb-3">
                    <Form.Label>Tipo de Incendio</Form.Label>
                    <Form.Select name="tipoIncendio" value={reporte.tipoIncendio} onChange={handleChange}>
                        <option value="Forestal">Forestal</option>
                        <option value="Estructural">Estructural</option>
                        <option value="Vehicular">Vehicular</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="danger" type="submit" className="w-100 py-2">
                    ENVIAR REPORTE
                </Button>
            </Form>
        </Container>
    );
}