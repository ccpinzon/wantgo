import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost, removeLike, addLike } from '../../actions/post';

const PostItemMe = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, titulo, categoria, frase, valor, ubicacion, fecha },
  showActions
}) => (

    <tr>
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
        <Link to={`/profile/${user}`}>
          <img className='round-img imgTable' src={avatar} alt='' />
        </Link>
      </td>
      <td>
        <p>{name}</p>
      </td>
      <td>
        <p><Moment format='YYYY/MM/DD'>{date}</Moment></p>
      </td>
      <td>
        <p >{titulo}</p>
      </td>
      <td>
        <p >{valor}</p>
      </td>
      <td>
        <p style={{ fontSize: "10px" }} >{text}</p>
      </td>
      <td style={{ fontSize: "10px" }}>
        {showActions && (
          <Fragment>
            <div className="row">
              <div className="col-md-6">

                {likes
                  ? likes.length > 0
                    ? <span>Aprobado</span>
                    : "En revisión"
                  : "cancelado"}

              </div>

            </div>
          </Fragment>
        )}
      </td>
    </tr>


  );

PostItemMe.defaultProps = {
  showActions: true
};

PostItemMe.propTypes = {
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
)(PostItemMe);
