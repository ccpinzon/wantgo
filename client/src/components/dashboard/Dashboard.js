import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
//import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import TablePost from './TablePost';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>

      <div className="fondo">
        <h1 className="large text-primary">Mi cuenta</h1>
        <p className="lead">
          <i className="fas fa-user" /> Bienvenido {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <TablePost post={profile.post} />

            <div className="my-2">
              <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus" /> Eliminar mi cuenta
            </button>
            </div>
          </Fragment>
        ) : (
            <Fragment>
              <p>No tienes información empresarial, Por favor agrega información</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Crear empresa
          </Link>
            </Fragment>
          )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
