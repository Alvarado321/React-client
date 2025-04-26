// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function App() {

  useEffect(() => {
    getEmpleados();
  }, []);

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("0");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [correo, setCorreo] = useState("");
  const [empleadosList, setEmpleados] = useState([]);
  const [idEmpleado, setIdEmpleado] = useState("");
  const [editar, setEditar] = useState(false);

  const add = () => {
    Axios.post("http://localhost:3001/create", { nombre, edad, pais, cargo, correo })
      .then(() => {
        getEmpleados();
        limpiar();
        MySwal.fire({
          title: <strong>¡Empleado Agregado!</strong>,
          text: 'El empleado ha sido agregado correctamente',
          icon: 'success'
        })
      });
  }

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados")
      .then((response) => {
        setEmpleados(response.data);
      });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", { idEmpleado, nombre, edad, pais, cargo, correo })
      .then(() => {
        getEmpleados();
        limpiar();
        setEditar(false);
        MySwal.fire({
          title: <strong>¡Empleado Actualizado!</strong>,
          text: 'El empleado ha sido actualizado correctamente',
          icon: 'success'
        })
      });
  }

  const editarEmpleado = (val) => {
    setEditar(true);
    setIdEmpleado(val.idEmpleado);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setCorreo(val.correo);
  }

  const limpiar = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setCorreo("");
    MySwal.fire({
      title: <strong>¡Formulario Limpiado!</strong>,
      text: 'Los campos han sido limpiados correctamente',
      icon: 'info'
    })
  }

  const eliminarEmpleado = (val) => {
    MySwal.fire({
      title: <strong>¿Eliminar Empleado?</strong>,
      text: `¿Estás seguro de que deseas eliminar a ${val.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.idEmpleado}`)
          .then(() => {
            getEmpleados();
            limpiar();
            MySwal.fire({
              title: <strong>¡Empleado Eliminado!</strong>,
              text: `El empleado ${val.nombre} ha sido eliminado correctamente`,
              icon: 'success'
            });
          });
      }
    });
  };

  // Filtro de busqueda
  

  return (
    <div className="card shadow rounded-4 p-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Gestión de Empleados</h1>
        <p className="text-muted">Agrega, edita y administra tu personal fácilmente</p>
      </div>

      <div className="row g-4">
        {/* Formulario */}
        <div className="col-lg-12">
          <div className="card shadow rounded-4 p-4">
            <h4 className="mb-4 text-center">{editar ? "Editar Empleado" : "Nuevo Empleado"}</h4>
            <form className="w-100">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="nombre"
                  />
                  <label>Nombre</label>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    value={edad}
                    onChange={(event) => setEdad(event.target.value)}
                    type="number"
                    className="form-control"
                    placeholder="Edad"
                    name="edad"
                  />
                  <label>Edad</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    value={pais}
                    onChange={(event) => setPais(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="País"
                    name="pais"
                    id="pais"
                  />
                  <label>País</label>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <input
                    value={cargo}
                    onChange={(event) => setCargo(event.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Cargo"
                    name="cargo"
                  />
                  <label>Cargo</label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-floating">
                <input
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="correo"
                />
                <label>Correo</label>
              </div>
            </div>

            <div className="row">
              <div className="card-footer text-muted">
                {
                  editar ?
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <button type="button" onClick={update} className="btn btn-primary w-100">
                        <i className="bi bi-person-check-fill me-2"></i>Actualizar
                      </button>
                    </div>
                    <div className="col-md-6 mb-3">
                      <button type="button" onClick={() => { limpiar(); setEditar(false); }} className="btn btn-warning w-100 text-white">
                        <i className="bi bi-person-x-fill me-2"></i>Cancelar
                      </button>
                    </div>
                  </div>
                  :
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <button type="button" onClick={add} className="btn btn-success w-100">
                        <i className="bi bi-person-plus-fill me-2"></i>Agregar
                      </button>
                    </div>
                    <div className="col-md-6 mb-3">
                      <button type="button" onClick={limpiar} className="btn btn-warning w-100 text-white">
                        <i className="bi bi-person-x-fill me-2"></i>Limpiar
                      </button>
                    </div>
                  </div>
                }
              </div>
            </div>
          </form>
          </div>
        </div>

        {/* // Filtro de busqueda */}


        {/* Tabla de Empleados */}
        <div className="col-lg-12">
          <div className="card shadow rounded-4 p-4">
            <h4 className="mb-4 text-center">Lista de Empleados</h4>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>País</th>
                    <th>Cargo</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {empleadosList.map((val, key) => (
                    <tr key={key}>
                      <th scope="row">#{val.idEmpleado}</th>
                      <td>{val.nombre}</td>
                      <td>{val.edad}</td>
                      <td>{val.pais}</td>
                      <td>{val.cargo}</td>
                      <td>{val.correo}</td>
                      <td>
                        <button type="button" onClick={() => editarEmpleado(val)} className="btn btn-outline-primary btn-sm">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" onClick={() => eliminarEmpleado(val)} className="btn btn-outline-danger btn-sm ms-2">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {empleadosList.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">No hay empleados registrados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
