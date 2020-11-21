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
const PostItemT = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, titulo, categoria, ubicacion, servicios, tipo, frase, avion, lancha, caminata, chiba, cuatrimoto, bicicleta, valor, images, carro, moto, caballo, moneda },
  showActions
}) => (
    <div className="col-md-3">
      <div className="card">
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
            <div key={images._id} className="imagenespostt">
              <img src={images.path} alt="..." className="imagendentrot" />
            </div>
          ))}
        </Carousel>
        <div className="card-block" style={{ width: "205px" }}>
          <h4 className="card-title">{titulo}</h4>
          <div className="meta">
            <Link to={`/posts/${_id}`} className='btn btn-primary' style={{ fontSize: "12px" }}>
              <i className='fa fa-eye' />
            </Link>
          </div>
          <div className="card-text">
            {frase}
          </div>
        </div>
        <div className="card-footer">
          <span className="float-right"><span className="span"> <Moment format='YYYY/MM/DD'>{date}</Moment></span></span>
          <span><i className=""></i>{ubicacion}</span>
        </div>
      </div>
    </div>
  );

PostItemT.defaultProps = {
  showActions: true
};

PostItemT.propTypes = {
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
)(PostItemT);
