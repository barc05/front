import React from 'react';
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css' // Asegura que los estilos de Bootstrap carguen
import NavigationBar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      {}
      <Home /> 
    </div>
  );
}

export default App