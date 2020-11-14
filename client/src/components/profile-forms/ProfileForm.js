import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Crea tu cuenta empresarial</h1>
      <p className="lead">
        <i className="fas fa-user" /> Agregar información
      </p>
      <small>* = campos obligatorios</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>* Selecciona tu rol empresarial</option>
            <option value="Gerente">Gerente</option>
            <option value="Asesor turistico">Asesor turistico</option>
            <option value="Guia turistico">Guia turistico</option>
            <option value="Manager">Manager</option>
            <option value="Estiduante">Estudiante</option>
            <option value="Otros">Otros</option>
          </select>
          <small className="form-text">
            Si requieres un campo especifico y no esta en esta lista, por favor comunicate con nosotros.
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Compañia"
            name="company"
            value={company}
            onChange={onChange}
          />
          <small className="form-text">
            Podría ser tu propia empresa o una para la que trabajas.
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />

        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Ubicación"
            name="location"
            value={location}
            onChange={onChange}
          />

        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Intereses"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
            Por favor separe por comas(diversion,agua)
          </small>
        </div>
        <div className="form-group">
          <input
            type="hidden"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={onChange}
          />

        </div>
        <div className="form-group">
          <textarea
            placeholder="Un corta biografía"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Cuéntanos un poco sobre ti</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Agregar información social
          </button>
          <span>Opcional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Volver
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
