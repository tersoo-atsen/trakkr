/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import './footer.scss';
import trakkrLogo from '../../assets/images/trakkr-logo.svg';
import facebook from '../../assets/images/facebook.svg';
import twitter from '../../assets/images/twitter.svg';
import instagram from '../../assets/images/instagram.svg';

const Footer = () => (
  <footer className="footer">
    <div className="columns is-tablet">
      <div className="column is-half">
        <img className="footer__logo" src={trakkrLogo} alt="Trakkr logo" />
      </div>
      <div className="column">
        <span className="footer__item">Help Center</span>
        <span className="footer__item">Blog</span>
      </div>
      <div className="column">
        <span className="footer__item">Company</span>
        <span className="footer__item">About</span>
      </div>
      <div className="column">
        <span className="footer__item">Security</span>
        <span className="footer__item">Terms and conditions</span>
      </div>
    </div>
    <hr className="footer__separator" />
    <div className="columns is-mobile">
      <div className="column footer__copyright-text">
        <span>&copy; {(new Date().getFullYear())} Trakkr. All rights reserved.</span>
      </div>
      <div className="column">
        <span className="footer__links">
          <span className="footer__link"><img className="footer__link--twitter" src={twitter} alt="Twitter link" /></span>
          <span className="footer__link"><img className="footer__link--facebook" src={facebook} alt="Facebook link" /></span>
          <span className="footer__link"><img className="footer__link--instagram" src={instagram} alt="Instagram link" /></span>
          <span />
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
