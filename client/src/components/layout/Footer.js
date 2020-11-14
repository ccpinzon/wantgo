import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer-area footer--dark  navbar-dark bg-dark">
        <div className="footer-big">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-12">
                <div className="footer-widget">
                  <div className="widget-about">
                    <h5>wantGo Colombia,Tunja</h5>
                    <ul className="contact-details">
                      <li className="m-2 listas">
                        <span className="icon-earphones "></span> Noticias

                      </li>
                      <li className="m-2 listas">
                        <span className="icon-envelope-open"></span>
                        Ofertas de trabajo
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-4">
                <div className="footer-widget">
                  <div className="footer-menu footer-menu--1">
                    <h4 className="footer-widget-title">Centro de recursos</h4>
                    <ul className="listas">
                      <li>
                        <Link to="#">comunidad</Link>
                      </li>
                      <li>
                        <Link to="#">Terminos y condiciones</Link>
                      </li>
                      <li>
                        <Link to="#">Aviso de privacidad</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-4">
                <div className="footer-widget">
                  <div className="footer-menu">
                    <h4 className="footer-widget-title">Asistencia WantGo</h4>
                    <ul className="listas">
                      <li>
                        <Link to="#">Centro de ayuda</Link>
                      </li>
                      <li>
                        <Link to="#">Opciones de cancelacion</Link>
                      </li>
                      <li>
                        <Link to="#">Plan &amp; Pricing</Link>
                      </li>
                      <li>
                        <Link to="#">Blog</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-sm-4">
                <div className="footer-widget">
                  <div className="footer-menu no-padding">
                    <h4 className="footer-widget-title">Contactenos</h4>
                    <ul className="listas">
                      <li>
                        <Link to="#">311 470 7052 - 316 431 0861</Link>
                      </li>

                      <li>
                        <Link to="#">contactowantgo@wantgo.com</Link>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mini-footer" style={{ textAlign: "center ", backgroundColor: "black" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="copyright-text">
                  <p>
                    © 2020
                    <Link to="#">wantGo</Link>. All rights reserved.
                  </p>
                </div>
                <div className="go_top">
                  <span className="icon-arrow-up"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
