import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
  const authLinks = (
    <div className="col-md-3" >
      {
        user && user.email === "juand13@gmail.com" ?
          <div className="collapse navbar-collapse" id="navbarNav" style={{ textAlign: "center", width: "100%" }}>
            <Link className="nav-link " to="/juand13/admin/wantgo" >
              Administrador
                </Link>
            <Link className="nav-link btnres" to="#!" onClick={logout}>
              Salir
                </Link>
          </div>
          : <div className="collapse navbar-collapse" id="navbarNav" style={{ textAlign: "center", width: "100%" }}>
            <Link className="nav-link " to="/posts" >
              Planes turisticos
                </Link>
            <Link className="nav-link " to="/dashboard" >
              Mi perfil
                </Link>
            <Link className="nav-link " to="/add-posts" >
              Crear plan
                </Link>
            <Link className="nav-link btnres" to="#!" onClick={logout}>
              Salir
                </Link>
          </div>
      }

    </div>
  );

  const guestLinks = (
    <div className="col-md-3" >
      <div className="collapse navbar-collapse" id="navbarNav" style={{ textAlign: "center" }}>
        <Link style={{ fontSize: "25px", color: "white" }} to="/register" >
          Aún no tienes cuenta?
              </Link>
      </div>
      <div className="collapse navbar-collapse" id="navbarNav" style={{ textAlign: "center", width: "100%" }}>
        <Link className="nav-link btnres" to="/register">
          Registrate
                </Link>
      </div>
    </div>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">

        <div className="col-md-9" style={{ textAlign: "center" }}>
          <Link className="nav-link titulo" to="/">
            WantGo Turistico
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

        </div>
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>

      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

