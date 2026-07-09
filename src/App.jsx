import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'; 
import Register from './pages/Register';
import NavigationBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Notificaciones from './pages/Notificaciones';
import Reportes from './pages/Reportes';
import AlertasFuncionario from './pages/AlertasFuncionario';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/enviar-alerta" element={<AlertasFuncionario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
