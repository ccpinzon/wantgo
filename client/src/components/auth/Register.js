import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telefono: '',
    documento: '',
    pais: '',
    password: '',
    password2: ''
  });

  const { name, email, telefono, documento, password, pais, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Contraseñas no coinciden', 'danger');
    } else {
      register({ name, email, telefono, documento, password, pais });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4" style={{ textAlign: "center" }}>
            <br /> <br />
            <div className="card card-body" style={{ borderStyle: "none" }}>
              <h1 className="">Registrate</h1>
              <form className="form-group" onSubmit={e => onSubmit(e)} >
                <div className="mb-1">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Razón social/Nombre"
                    name="name"
                    value={name}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="mb-1 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="País"
                    name="pais"
                    value={pais}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="mb-1 ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Documento/Nit"
                    name="documento"
                    value={documento}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className="mb-1 ">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Telefono"
                    name="telefono"
                    value={telefono}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>
                <div className=" mb-1 ">
                  <input
                    type="mail"
                    className="form-control"
                    placeholder="Correo electrónico"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    required
                  />
                </div>

                <div className="mb-1">

                  <div className="input-group">
                    <input id="txtPassword"
                      type="password"
                      className="form-control"
                      placeholder="Contraseña"
                      name="password"
                      value={password}
                      onChange={e => onChange(e)}
                      required
                    />
                    <div className="input-group-append">
                      <button id="show_password" className=" btn btn-primary" type="button" > <span className="fa fa-eye-slash icon"></span> </button>
                    </div>
                  </div>
                </div>
                <div className="mb-1 ">
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirmar contraseña"
                      name="password2"
                      value={password2}
                      onChange={e => onChange(e)}
                      required
                    />
                    <div className="input-group-append">
                      <button id="show_password" className="btn btn-primary" type="button" ><span className="fa fa-eye-slash icon"></span> </button>
                    </div>
                  </div>
                </div> <br />
                <label style={{ fontSize: "10px", color: "gray" }}>
                  Al hacer click en "Registrarte" aceptas nuestras condiciones la politica de datos y la politica de cookies.
                  Es posible que te enviemos notificaciones por SMS, que puedes desactivar cuando quieras.
                </label>
                <button type="submit" className="btnmi btn-primary">
                  Registrate
              </button>
              </form>
            </div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-1 formulario"></div>
          <div className="col-md-6">
            <img src="wg.jpeg" alt="" style={{ width: "100%" }} />
          </div>

        </div>
        <img src="play.png" alt="" className="iconosr" />
        <img src="apple.png" alt="" className="iconossr" />
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
