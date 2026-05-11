// src/utils/geoUtils.js
export const obtenerUbicacionActual = () => {
    return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
            reject(new Error("Geolocalización no soportada"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitud: position.coords.latitude.toFixed(6),
                    longitud: position.coords.longitude.toFixed(6)
                });
            },
            (error) => reject(error)
        );
    });
};