// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("0");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [correo, setCorreo] = useState("");

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      correo: correo
    }).then((response) => {
      alert("Empleado agregado");
      console.log(response);
    });
  }

  return (
    <div className="App">
      <div className="datos">
          <label> Nombre: 
            <input onChange={(event) => {setNombre(event.target.value)}} type="text"/>
          </label>
          <label> Edad: 
            <input onChange={(event) => {setEdad(event.target.value)}} type="number"/>
          </label>
          <label> País: 
            <input onChange={(event) => {setPais(event.target.value)}} type="text"/> 
          </label>
          <label> Cargo: 
            <input onChange={(event) => {setCargo(event.target.value)}} type="text"/>
          </label>
          <label> Correo: 
            <input onChange={(event) => {setCorreo(event.target.value)}} type="text"/>
          </label>
          <button onClick={add}>Agregar</button>
      </div>
    </div>
  );
}

export default App;
