import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostsMe } from '../../actions/post';
import PostItemMe from '../posts/PostItemMe';


const TablePost = ({ getPostsMe, post: { posts } }) => {
    useEffect(() => {
        getPostsMe();
    }, [getPostsMe]);

    return (
        <Fragment>

            <table className="table" >
                <thead >
                    <tr >
                        <th style={{ width: "100px", textAlign: "center" }} >Acciones</th>
                        <th style={{ textAlign: "center" }}>Foto</th>
                        <th style={{ width: "120px", textAlign: "center" }} >Creado por</th>
                        <th style={{ textAlign: "center" }} >Fecha</th>
                        <th style={{ width: "100px", textAlign: "center" }} >Titulo</th>
                        <th style={{ width: "120px", textAlign: "center" }} >Valor</th>
                        <th style={{ textAlign: "center" }}>Descripción</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <PostItemMe key={post._id} post={post} />
                    ))}
                </tbody>
            </table>

        </Fragment>
    );
};

TablePost.propTypes = {
    getPostsMe: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post

});

export default connect(mapStateToProps, { getPostsMe })(TablePost);
