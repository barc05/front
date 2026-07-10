// src/service/reporteService.jsx
const API_URL = "https://api-gateway-1w1b.onrender.com/api/reportes";

export const enviarReporteIncendio = async (reporte) => {
    const token = localStorage.getItem('token');
    const correo = localStorage.getItem('correo');

    const datosParaEnviar = {
        latitud: parseFloat(reporte.latitud),
        longitud: parseFloat(reporte.longitud),
        tipoIncendio: reporte.tipoIncendio,
        correoUsuario: correo,
        usuarioId: userId
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(datosParaEnviar),
    });

    if (!response.ok) {
        throw new Error("Error al guardar el reporte");
    }

    const textoRespuesta = await response.text();

    try {
        return JSON.parse(textoRespuesta); 
    } catch (e) {
        return { 
            id: Date.now(), 
            status: "SUCCESS",
            mensaje: textoRespuesta 
        }; 
    }
};

export const obtenerReportes = async () => {
    const token = localStorage.getItem('token');
    const correo = localStorage.getItem('correo'); 

    const response = await fetch(`${API_URL}?correo=${correo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener los reportes");
    }

    return await response.json();
};