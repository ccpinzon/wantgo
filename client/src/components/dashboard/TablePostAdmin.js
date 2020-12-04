import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItemAdmin from '../posts/PostItemAdmin';


const TablePostAdmin = ({ getPosts, post: { posts } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Fragment>
            <br />
            <div  >
                <div className="row">

                    <div className="col-md-3" style={{ textAlign: "center", borderRadius: "10px", borderStyle: "solid", borderWidth: "1px", borderColor: "#4B92F4", background: "#4B92F4 " }}>
                        <div style={{ color: "white" }}> <h1>{posts.length}</h1> </div>
                        <div style={{ background: "white" }}><p style={{ color: "#4B92F4 " }}>N. de planes en total</p></div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-3" style={{ textAlign: "center", borderRadius: "10px", borderStyle: "solid", borderWidth: "1px", borderColor: "#50D844", background: "#50D844 " }}>
                        <div style={{ color: "white" }}> <h1>{posts.length}</h1> </div>
                        <div style={{ background: "white" }}><p style={{ color: "#50D844" }}>N. de empresas</p></div>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-3" style={{ textAlign: "center", borderRadius: "10px", borderStyle: "solid", borderWidth: "1px", borderColor: "#DE3202", background: "#DE3202 " }}>
                        <div style={{ color: "white" }}> <h1>{posts.length}</h1> </div>
                        <div style={{ background: "white" }}><p style={{ color: "#DE3202 " }}>N. de planes en la App</p></div>
                    </div>
                </div>
            </div> <br />
            <table className="table" >
                <thead >
                    <tr >
                        <th style={{ width: "130px", textAlign: "center" }} >Titulo</th>
                        <th style={{ width: "120px", textAlign: "center" }} >Responsable</th>
                        <th style={{ textAlign: "center" }} >Fecha</th>
                        <th style={{ textAlign: "center" }}>Descripción</th>
                        <th style={{ width: "120px", textAlign: "center" }} >Valor</th>
                        <th style={{ width: "100px", textAlign: "center" }} >Acciones</th>
                        <th style={{ width: "100px", textAlign: "center" }} >Estado</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <PostItemAdmin key={post._id} post={post} />
                    ))}
                </tbody>
            </table>

        </Fragment>
    );
};

TablePostAdmin.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post

});

export default connect(mapStateToProps, { getPosts })(TablePostAdmin);
