import React, { Component } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
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
export default class Image extends Component {

    fileObj = [];
    fileArray = [];

    constructor() {
        super()
        this.state = {
            file: [null]
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
        console.log(this.fileArray, "aca el array con los datos de la imagen")
    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }


    render() {
        return (
            <>
                {/* <div className="container">
                    <div className="imagengrande">
                        {(this.fileArray || []).map(url => (
                            <div><img src={url} alt="..." style={{ width: "200px" }} /></div>
                        ))}
                    </div>
                </div> <br /> */}
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {(this.fileArray || []).map(url => (
                        <div key={url}><img src={url} alt="..." className="marcoimagenes" /></div>
                    ))}


                </Carousel>

                <div className="form-group">
                    <input type="file" name="images" className="form-control" onChange={this.props.funcionEnviar} value={this.props.valor} onchance={this.uploadFiles} multiple />
                </div>
            </>
        )
    }
}
