/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import './footer.scss';
import trakkrLogo from '../../../public/trakkr-logo.svg';
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
        <span className="footer__links">Help Center</span>
        <span className="footer__links">Blog</span>
      </div>
      <div className="column">
        <span className="footer__links">Company</span>
        <span className="footer__links">About</span>
      </div>
      <div className="column">
        <span className="footer__links">Security</span>
        <span className="footer__links">Terms and conditions</span>
      </div>
    </div>
    <hr className="footer__separator" />
    <div className="columns is-mobile">
      <div className="column footer__copyright-text">
        <span>&copy; {(new Date().getFullYear())} Trakkr. All rights reserved.</span>
      </div>
      <div className="column">
        <span className="footer__social-links">
          <span className="footer__social-link"><img className="footer__social-link--twitter" src={twitter} alt="Twitter link" /></span>
          <span className="footer__social-link"><img className="footer__social-link--facebook" src={facebook} alt="Facebook link" /></span>
          <span className="footer__social-link"><img className="footer__social-link--instagram" src={instagram} alt="Instagram link" /></span>
          <span />
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
