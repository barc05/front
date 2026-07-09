import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AlertasFuncionario = () => {
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });


  const GATEWAY_URL = 'https://api-gateway-1w1b.onrender.com/api/alertas/difundir';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    const token = localStorage.getItem('token');

    const datosAlerta = { asunto, mensaje };

    try {
      const response = await fetch(GATEWAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosAlerta),
      });

      if (response.ok) {
        setStatus({ type: 'success', text: '¡Alerta difundida masivamente con éxito al correo alertas.incendio@gmail.com!' });
        setAsunto('');
        setMensaje('');
      } else {
        const errText = await response.text();
        setStatus({ type: 'danger', text: `Error en el servidor: ${errText || 'No se pudo procesar.'}` });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'danger', text: 'No se pudo establecer conexión con el API Gateway.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <div className="p-4 shadow-sm rounded bg-light border">
        <h2 className="mb-3 text-dark">Panel de Difusión de Emergencias</h2>
        <p className="text-muted">Espacio exclusivo para funcionarios autorizados de Bomberos o CONAF.</p>
        
        {status.text && <Alert variant={status.type}>{status.text}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600' }}>Asunto de la Alerta:</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ej: [EMERGENCIA] Evacuación Obligatoria por Incendio Forestal" 
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: '600' }}>Mensaje e Instrucciones a la Población:</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={5} 
              placeholder="Escriba aquí las coordenadas, puntos de encuentro o detalles críticos del siniestro..." 
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required 
            />
          </Form.Group>

          <Button variant="danger" type="submit" className="w-100 py-2" disabled={loading}>
            {loading ? 'Procesando envío masivo...' : 'Difundir Alerta por Correo'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default AlertasFuncionario;
