import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost, removeLike, addLike } from '../../actions/post';


const PostItemAdmin = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, titulo, categoria, frase, valor, ubicacion, fecha },
  showActions
}) => (
  <>
    <tr>
      <td>
        <p >{titulo}</p>
      </td>
      <td>
        <p>{name}</p>
      </td>
      <td>
        <p><Moment format='YYYY/MM/DD'>{date}</Moment></p>
      </td>
      <td>
        <p style={{ fontSize: "10px" }} >{text}</p>
      </td>
      <td>
        <p >${valor}</p>
      </td>
      <td>
        <Link to={`/posts/${_id}`} className='btn btn-primary' style={{ width: "50%" }}>
          <i className='fas fa-eye' />
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            style={{ width: "50%" }}
            onClick={() => deletePost(_id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times' />
          </button>
        )}
      </td>
      <td>
        {showActions && (
          <Fragment>
            <div className="row">
              <div className="col-md-6">
                <button
                  onClick={() => addLike(_id)}
                  type='button'
                  className='btn btn-light'
                >
                  <i className='fas fa-check' />{' '}
                  <span>{likes.length > 0 && <span>Aprobado</span>}</span>
                </button>
              </div>
              <div className="col-md-6">
                <button
                  onClick={() => removeLike(_id)}
                  type='button'
                  className='btn btn-light'
                >
                  <i className='fas fa-times' />
                </button>

              </div>
            </div>
          </Fragment>
        )}
      </td>
    </tr>

  </>
);

PostItemAdmin.defaultProps = {
  showActions: true
};

PostItemAdmin.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItemAdmin);
