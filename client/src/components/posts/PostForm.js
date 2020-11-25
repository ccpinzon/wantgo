import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import Image from './Image';
import ImageUploader from "react-images-upload";

const PostForm = ({ addPost, history }) => {

  const [pictures, setPictures] = useState([]);
  const onDrop = picture => {
    setPictures(picture);
    console.log(picture)
    for (let i = 0; i < pictures.length; i++) {
      formData.append('images', pictures[i], pictures[i].name)
    }
  };
  const [datos_Form, setdatos_FormData] = useState({
    text: "",
    name: "",
    titulo: "",
    ubicacion: "",
    tipo: "",
    frase: "",
    valor: "",
    carro: "",
    moto: "",
    caballo: "",
    avion: "",
    lancha: "",
    caminata: "",
    chiba: "",
    cuatrimoto: "",
    bicicleta: "",
    moneda: "",
    servicios: "",
    categoria: ""

  });
  const formData = new FormData()
  const convertirDatosFormaData = () => {
    formData.append('text', datos_Form.text)
    formData.append('titulo', datos_Form.titulo)
    formData.append('tipo', datos_Form.tipo)
    formData.append('frase', datos_Form.frase)
    formData.append('valor', datos_Form.valor)
    formData.append('categoria', datos_Form.categoria)
    formData.append('servicios', datos_Form.servicios)
    formData.append('ubicacion', datos_Form.ubicacion)
    formData.append('carro', datos_Form.carro)
    formData.append('moto', datos_Form.moto)
    formData.append('caballo', datos_Form.caballo)
    formData.append('avion', datos_Form.avion)
    formData.append('lancha', datos_Form.lancha)
    formData.append('caminata', datos_Form.caminata)
    formData.append('chiba', datos_Form.chiba)
    formData.append('cuatrimoto', datos_Form.cuatrimoto)
    formData.append('bicicleta', datos_Form.bicicleta)
    formData.append('moneda', datos_Form.moneda)
  }
  console.log(formData, "aca los datos")
  const onChange = (event) => {
    setdatos_FormData({
      ...datos_Form,
      [event.target.name]: event.target.value
    });

  }
  return (

    <div className="container">
      <br />
      <form className="form"
        encType="multipart/form-data"
        onSubmit={e => {
          e.preventDefault();
          convertirDatosFormaData()
          onDrop();
          addPost(formData, history.push('/posts'));
        }}>
        <div className="row">
          <div className="col-md-4">
            <div className="card card-body">
              <div className="">
                <label htmlFor="">Ubicación</label>
                <input
                  type="text"
                  className="form-control"
                  name="ubicacion"
                  value={datos_Form.ubicacion}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="">
                <label htmlFor="">Titulo de la Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  name="titulo"
                  value={datos_Form.titulo}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="">
                <label htmlFor="">Categoría</label>
                <input
                  type="text"
                  className="form-control"
                  name="categoria"
                  value={datos_Form.categoria}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="">
                <img src="api.png" alt="" />
              </div>
              <label htmlFor="">Tipo de transporte</label>
              <div className="form-group " style={{ borderStyle: "solid", borderColor: "#ebebeb", borderWidth: "1px" }}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input"
                          type="checkbox"
                          name="carro"
                          onChange={onChange}
                          value="carro" />
                        <label className="form-check-label">Carro</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input"
                          type="checkbox" id="inlineCheckbox2"
                          name="moto"
                          onChange={onChange}
                          value="Motocicleta"
                        />
                        <label className="form-check-label" >Motocicleta</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input"
                          type="checkbox"
                          name="caballo"
                          onChange={onChange}
                          value="Caballo"
                        />
                        <label className="form-check-label" >Caballo  </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input"
                          type="checkbox"
                          name="avion"
                          onChange={onChange}
                          value="Avion"
                        />
                        <label className="form-check-label" >Avion </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input"
                          type="checkbox"
                          name="lancha"
                          onChange={onChange}
                          value="Lancha"
                        />
                        <label className="form-check-label" >Lancha </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input"
                          type="checkbox"
                          name="caminata"
                          onChange={onChange}
                          value="Caminata"
                        />
                        <label className="form-check-label" >Caminata</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input"
                          type="checkbox"
                          name="chiba"
                          onChange={onChange}
                          value="Chiba"
                        />
                        <label className="form-check-label" >Chiba</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input"
                          type="checkbox"
                          name="cuatrimoto"
                          onChange={onChange}
                          value="Cuatrimoto"
                        />
                        <label className="form-check-label" >Cuatrimoto  </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input"
                          type="checkbox"
                          name="bicicleta"
                          onChange={onChange}
                          value="Bicicleta"
                        />
                        <label className="form-check-label">Bicicleta </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <label htmlFor="" style={{ color: "rgb(18, 144, 162, 1)" }}>Frase Principal</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="frase"
                  value={datos_Form.frase}
                  onChange={onChange}
                  required
                  placeholder="maximo 40 caracteres"
                ></textarea>
              </div> <br />

              <div className="" style={{ display: "flex" }}>
                <label> Precio por persona</label>
                <input
                  type="number"
                  className="form-control"
                  name="valor"
                  value={datos_Form.valor}
                  onChange={onChange}
                  required
                />
                <select class="custom-select mr-sm-2" name="moneda" onChange={onchange} value={datos_Form.moneda}>
                  <option selected>$</option>
                  <option value="COP">COP</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>


            </div>
          </div>
          <div className="col-md-8">
            <ImageUploader
              required
              withPreview={true}
              withIcon={true}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />

            <div className="">
              <label htmlFor="" className="btnmi">Descripción</label>
              <textarea
                type="text"
                className="form-control"
                name="text"
                value={datos_Form.text}
                onChange={onChange}
                required
                placeholder="maximo 500 caracteres"
              ></textarea>
            </div>
            <br /> <br />
            <div className="">
              <label className="btnmi">Servicios ofrecidos</label>
              <textarea
                type="text"
                className="form-control"
                name="servicios"
                value={datos_Form.servicios}
                onChange={onChange}
                required
                placeholder="maximo 300 caracteres"
              ></textarea>
            </div>
          </div>
        </div>
        <br />
        <button type="submit" className="btnmi ">
          guardar
              </button>
      </form>

      <br />
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);

