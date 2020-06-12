/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import './footer.scss';
import trakkrLogo from '../../assets/images/trakkr_logo.png';
import facebook from '../../assets/images/icon-facebook-96.png';
import twitter from '../../assets/images/icon-twitter-96.png';
import instagram from '../../assets/images/icon-instagram-96.png';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content-wrapper container">
      <div className="columns is-tablet is-marginless">
        <div className="column">
          <div className="footer-section is-flex is-horizontal-center">
            <img className="footer__logo" src={trakkrLogo} alt="Trakkr logo" />
          </div>
        </div>
        <div className="column">
          <div className="footer-section is-flex is-horizontal-center footer__copyright-text">
            <span>&copy; {(new Date().getFullYear())} Trakkr. All rights reserved.</span>
          </div>
        </div>
        <div className="column">
          <div className="footer-section is-flex is-horizontal-center links_wrapper">
            <span className="footer__links">
              <span className="footer__link"><img className="footer__link--twitter" src={twitter} alt="Twitter link" /></span>
              <span className="footer__link"><img className="footer__link--facebook" src={facebook} alt="Facebook link" /></span>
              <span className="footer__link"><img className="footer__link--instagram" src={instagram} alt="Instagram link" /></span>
              <span />
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
