import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/posts" />;
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src="wg.jpeg" alt="" style={{ width: "100%" }} />
          </div>
          <div className="col-md-1 "></div>
          <div className="col-md-1 formulario"></div>
          <div className="col-md-6 " >
            <div
              className="  animated bounceInRight  "
              style={{ width: "80%" }}

            >
              <div className="card-body">
                <div className="card-title" style={{ textAlign: "center" }}>
                  <h1 className="tituloB">Bienvenido</h1>
                  <h3>Inicia sesión y carga  tú plan turístico</h3>
                  <br />  <b></b>
                </div>

                <form onSubmit={e => onSubmit(e)}>
                  <div className="form-group ">
                    <input
                      type="text"
                      className="form-control input"
                      placeholder="Correo"
                      name="email"
                      value={email}
                      onChange={e => onChange(e)}
                      required
                    />
                  </div>

                  <div className="form-group ">
                    <input
                      type="password"
                      className="form-control input "
                      placeholder="Contraseña"
                      name="password"
                      value={password}
                      onChange={e => onChange(e)}
                      required
                    />
                    <label >seguridad minimo 6 caracteres</label>
                  </div>

                  <button type="submit" className="btnmi btn-primary" style={{ width: "100%" }} >
                    iniciar sesion

                  </button>
                  <div className="form-check">
                    <br />
                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                    <label className="form-check-label" >
                      Recuerdame
                    </label> <br />
                    <a href="">Olvidaste tu contraseña</a>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
        <img src="play.png" alt="" className="iconos" />
        <img src="apple.png" alt="" className="iconoss" />
      </div >
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
