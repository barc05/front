// src/services/reporteService.js
const API_URL = "http://localhost:8081/api/reportes";

export const enviarReporteIncendio = async (reporte) => {
    const datosParaEnviar = {
        latitud: parseFloat(reporte.latitud),
        longitud: parseFloat(reporte.longitud),
        tipoIncendio: reporte.tipoIncendio
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosParaEnviar),
    });

    if (!response.ok) {
        throw new Error("Error al guardar el reporte");
    }

    return await response.json();
};