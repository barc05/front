// barc05/front/front-develop/src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Por si tu backend maneja email
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje({ texto: '', tipo: '' });

        // 1. VALIDACIÓN EN FRONTEND
        if (!username.trim() || !email.trim() || !password.trim()) {
            setMensaje({ texto: 'Por favor, completa todos los campos.', tipo: 'warning' });
            return;
        }

        try {
            // 2. PETICIÓN AL GATEWAY (Apuntando a la ruta que maneja tu microservicio)
            // NOTA: Si tu controlador usa "/registrar", déjalo así. Si usa la raíz, quita "/registrar".
            const response = await fetch('https://api-gateway-1w1b.onrender.com/api/v1/usuarios/registrar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                setMensaje({ texto: '¡Usuario registrado con éxito! Redirigiendo al Login...', tipo: 'success' });
                // Redirigir al login después de 2 segundos
                setTimeout(() => navigate('/login'), 2000);
            } else {
                // 3. LEER EL ERROR DE FORMA SEGURA (Evita que la pantalla no haga nada)
                try {
                    const data = await response.json();
                    setMensaje({ texto: data.message || 'Error al registrar el usuario.', tipo: 'danger' });
                } catch (jsonError) {
                    // Si el backend responde texto plano en vez de JSON
                    setMensaje({ texto: 'Error en el registro (Código ' + response.status + ').', tipo: 'danger' });
                }
            }
        } catch (error) {
            setMensaje({ texto: 'Error al conectar con el servidor.', tipo: 'danger' });
        }
    };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Crear Cuenta</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '10px' }}>
          <label>Usuario:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Contraseña:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;