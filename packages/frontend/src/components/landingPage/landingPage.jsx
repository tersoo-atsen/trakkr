import React, { Component } from 'react';

import './landingPage.scss';
import ConnectedNavbar from '../navbar';
import Footer from '../footer';
import ImageLoader from '../imageLoader';
import { dashboard as hiRes, features } from '../../utils';
import lowRes from '../../assets/images/trakkr-dashboard-blurred.png';

class LandingPage extends Component {
  state = {};

  featureElement = (feature, idx) => (
    <div key={idx} className="column">
      <div className="feature">
        <div className="feature__wrapper is-clearfix">
          <div className="is-pulled-left">
            <img className="feature__icon" src={feature.iconSrc} alt={feature.altText} />
          </div>
          <div className="feature__text is-pulled-left">
            <p className="feature__title">{feature.title}</p>
            <p className="feature__sub-text">{feature.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );

  render() {
    return (
      <div className="page-wrapper">
        <ConnectedNavbar />
        <div className="page-top" />
        <div className="page-bottom" />
        <Footer />
        <div className="page-content">
          <div className="page-top__text-wrapper">
            <h3 className="page-top__title-text is-uppercase">Your complete collection tracking solution</h3>
            <h5 className="page-top__sub-text">All of your stuff. All in one place.</h5>
          </div>
          <div className="product-photo--center">
            <ImageLoader
              classString="product--photo responsive"
              hiResSource={hiRes}
              lowResSource={lowRes}
              altText="Trakkr illustration"
            />
          </div>
          <div className="page-bottom__features">
            <div className="columns">
              {features.map((feature, idx) => this.featureElement(feature, idx))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
