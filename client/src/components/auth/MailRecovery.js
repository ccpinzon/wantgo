import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { mailRecovery } from '../../actions/auth';
import PropTypes from 'prop-types';


const MailRecovery = ({ setAlert, mailRecovery, isAuthenticated }) => {
    //const { token } = req.params;

    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;
    console.log(email, "aca el email antes de la funcion")
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setAlert('Correo no existe', 'danger');
        } else {
            mailRecovery(email);
        }
        console.log(mailRecovery.email, "acadeberia ir el correo")
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
                                <div className="mb-1 ">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Digite su correo"
                                        name="email"
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <label style={{ fontSize: "10px", color: "gray" }}>
                                    Enviaremos un correo de recuperación a su cuenta asociada a WantGo Turistico
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

MailRecovery.propTypes = {
    setAlert: PropTypes.func.isRequired,
    mailRecovery: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, mailRecovery })(MailRecovery);