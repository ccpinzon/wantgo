import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Editar cuenta
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary' /> Agregar experiencia turistica
      </Link>
      <Link to='/add-posts' className='btn btn-light'>
        <i className='fab fa-fa-eye text-primary' /> Agregar plan turistico
      </Link>
    </div>
  );
};

export default DashboardActions;
