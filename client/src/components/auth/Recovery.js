import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { recovery } from '../../actions/auth';
import PropTypes from 'prop-types';


//import css module

const Recovery = ({ setAlert, recovery, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: '',
        password2: ''
    });
    const { password, password2, email } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Contraseñas no coinciden', 'danger');
        } else {
            recovery(email, password);
        }
    };
    if (isAuthenticated) {
        return <Redirect to="/login" />;
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-4" style={{ textAlign: "center" }}>
                        <div className="card card-body" style={{ borderStyle: "none" }}>
                            <h1 className="">Cambiar contraseña</h1>
                            <form className="form-group" onSubmit={e => onSubmit(e)} >

                                <div className="mb-1">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Digite el correo"
                                        name="email"
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className="mb-1">
                                    <input id="txtPassword"
                                        type="password"
                                        className="form-control"
                                        placeholder="Contraseña"
                                        name="password"
                                        value={password}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className="mb-1 ">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirmar contraseña"
                                        name="password2"
                                        value={password2}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <label style={{ fontSize: "10px", color: "gray" }}>
                                    Al hacer click en "Registrarte" aceptas nuestras condiciones la politica de datos y la politica de cookies.
                                    Es posible que te enviemos notificaciones por SMS, que puedes desactivar cuando quieras.
                </label>
                                <button type="submit" className="btnmi btn-primary">
                                    Confirmar
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

Recovery.propTypes = {
    setAlert: PropTypes.func.isRequired,
    recovery: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, recovery })(Recovery);