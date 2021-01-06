/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';
import trakkrLogo from '../../assets/images/trakkr_logo.png';
import facebook from '../../assets/images/icon-facebook-96.png';
import twitter from '../../assets/images/icon-twitter-96.png';
import instagram from '../../assets/images/icon-instagram-96.png';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-content-wrapper container">
      <div className="columns is-tablet is-marginless ordered-mobile">
        <div className="column o-1">
          <div className="footer-section is-flex is-horizontal-center">
            <Link className="navbar-item" to="/">
              <img className="footer__logo" src={trakkrLogo} alt="Trakkr logo" />
            </Link>
          </div>
        </div>
        <div className="column o-3">
          <div className="footer-section is-flex is-horizontal-center footer__copyright-text">
            <span>&copy; {(new Date().getFullYear())} Trakkr. All rights reserved.</span>
          </div>
        </div>
        <div className="column o-2">
          <div className="footer-section is-flex is-horizontal-center links_wrapper">
            <div className="footer__links">
              <span className="footer__link"><img className="footer__link--twitter" src={twitter} alt="Twitter link" /></span>
              <span className="footer__link"><img className="footer__link--facebook" src={facebook} alt="Facebook link" /></span>
              <span className="footer__link"><img className="footer__link--instagram" src={instagram} alt="Instagram link" /></span>
              <span />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
