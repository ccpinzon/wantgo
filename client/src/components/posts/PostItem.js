import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, titulo, categoria, ubicacion, servicios, tipo, frase, valor, images },
  showActions
}) => (
    <>
      <div className="container py-3">
        <div className="card">
          <div className="row ">
            <div className="col-md-7 px-3">
              <div className="card-block px-6">
                <div className="title h1 " style={{ color: "#00bfbf" }}>{ubicacion}</div>
                <h4 className="card-title">Titulo del plan: {titulo}</h4>
                <p className="card-text" style={{ fontSize: "12px" }}>
                  {text}
                </p>
                <div className="row">
                  <div className="col-md-12">
                    <label ><span style={{ color: "black" }}> <span style={{ color: "#01579b" }}>Servicios ofrecidos:</span> </span> <span className="span">{servicios}</span> </label> <br />
                    <label style={{ color: "#01579b" }}>categoría: <span className="span">{categoria}</span>  </label> <br />
                    <label > <span style={{ color: "#01579b" }}>Tipo de transporte: </span><span className="span">{tipo} </span></label>
                  </div>
                  <div className="col-md-12">
                    <label > <span style={{ color: "#01579b" }}>Frase:</span> <span className="span">{frase}</span></label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="row">
                <div className="col-md-8">
                  <p className='post-date'>
                    Publicado el <span className="span"> <Moment format='YYYY/MM/DD'>{date}</Moment></span>
                  </p>
                </div>
                <div className="col-md-4">
                  <label > Valor: <span style={{ color: "red" }} >${valor}</span></label>
                </div>
              </div>


              <div id="CarouselTest" className="carousel slide" data-ride="carousel">
                <Carousel
                  swipeable={false}
                  draggable={false}
                  showDots={true}
                  responsive={responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {images.map(images => (
                    <div key={images._id} className="imagenespost">
                      <img src={images.path} alt="..." className="imagendentro" />
                    </div>
                  ))}
                </Carousel>
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
                <div className="row">
                  {/* <div className="col-md-4">
                    <Link to={`/profile/${user}`}>
                      <img className='round-img imgTable' src={avatar} alt='' />
                    </Link>
                  </div> */}
                  <div className="col-md-12" style={{ marginLeft: "70%" }}>
                    <Link to={`/profile/${user}`}>
                      <h4 style={{ fontSize: "17px" }}>by {name}</h4>
                    </Link>
                  </div>
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
