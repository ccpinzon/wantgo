import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, titulo, categoria, ubicacion, servicios, tipo, frase, valor, path },
  showActions
}) => (
    <>
      <div class="container py-3">
        <div class="title h1 text-center">{ubicacion}</div>
        <div class="card">
          <div class="row ">
            <div class="col-md-7 px-3">
              <div class="card-block px-6">
                <h4 class="card-title">{titulo}</h4>
                <p class="card-text" style={{ fontSize: "12px" }}>
                  {text} <br />
                </p>
                <p class="card-text">Servicios ofrecidos: <span className="span">{servicios}</span> </p>
                <div className="row">
                  <div className="col-md-4">
                    <label >categoría: <span className="span">{categoria}</span>  </label>
                    <label > Tipo de transporte: <span className="span">{tipo} </span></label> <br />
                  </div>
                  <div className="col-md-4">
                    <label > Frase: <span className="span">{frase}</span></label>
                    <label > Valor: <span className="span">{valor}</span></label>
                  </div>
                  <div className="col-md-1">
                    <Link to={`/profile/${user}`}>
                      <img className='round-img imgTable' src={avatar} alt='' />
                    </Link>
                  </div>
                  <div className="col-md-2">
                    <Link to={`/profile/${user}`}>
                      <h4>{name}</h4>
                    </Link>
                  </div>
                </div>


              </div>
            </div>

            <div class="col-md-5">
              <div id="CarouselTest" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li data-target="#CarouselTest" data-slide-to="0" class="active"></li>
                  <li data-target="#CarouselTest" data-slide-to="1"></li>
                  <li data-target="#CarouselTest" data-slide-to="2"></li>

                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="d-block" src="https://picsum.photos/450/300?image=855" alt="" />
                  </div>
                  <div class="carousel-item">
                    <img class="d-block" src={path} alt="" />
                  </div>
                  <div class="carousel-item">
                    <img class="d-block" src="https://picsum.photos/450/300?image=355" alt="" />
                  </div>
                  <a class="carousel-control-prev" href="#CarouselTest" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#CarouselTest" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  {showActions && (
                    <Fragment>
                      <button
                        onClick={() => addLike(_id)}
                        type='button'
                        className='btn btn-light'
                      >
                        <i className='fas fa-thumbs-up' />{' '}
                        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
                      </button>
                      <button
                        onClick={() => removeLike(_id)}
                        type='button'
                        className='btn btn-light'
                      >
                        <i className='fas fa-thumbs-down' />
                      </button>
                      <Link to={`/posts/${_id}`} className='btn btn-primary' style={{ fontSize: "12px" }}>
                        Comentar{' '}
                        {comments.length > 0 && (
                          <span className='comment-count'>{comments.length}</span>
                        )}
                      </Link>
                      {!auth.loading && user === auth.user._id && (
                        <button
                          onClick={() => deletePost(_id)}
                          type='button'
                          className='btn btn-danger'
                        >
                          <i className='fas fa-times' />
                        </button>
                      )}
                    </Fragment>
                  )}
                </div>
                <div className="col-md-6" >
                  <p className='post-date'>
                    Publicado el <span className="span"> <Moment format='YYYY/MM/DD'>{date}</Moment></span>
                  </p>
                </div>


              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
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
)(PostItem);
