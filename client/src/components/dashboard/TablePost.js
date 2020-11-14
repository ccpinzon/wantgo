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
                    <tr>
                        <th>Acciones</th>
                        <th>Foto</th>
                        <th >Creado por</th>
                        <th >Fecha</th>
                        <th >Titulo</th>
                        <th >Valor</th>
                        <th >Descripción</th>
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
