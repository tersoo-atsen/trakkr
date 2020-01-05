import React, { Component } from 'react';

import './landingPage.scss';
import Navbar from '../navbar';
import Footer from '../footer';
import ImageLoader from '../imageLoader';
import { dashboard as hiRes } from '../../utils/images/images';
import lowRes from '../../assets/images/trakkr-dashboard-blurred.png';
import devices from '../../assets/images/multiple-devices.svg';
import activity from '../../assets/images/secure.svg';

class LandingPage extends Component {
  state = {};

  render() {
    return (
      <div className="page-wrapper">
        <Navbar />
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
              <div className="column">
                <div className="feature">
                  <div className="feature__wrapper is-clearfix">
                    <div className="is-pulled-left">
                      <img className="feature__icon" src={devices} alt="Multiple devices" />
                    </div>
                    <div className="feature__text is-pulled-left">
                      <p className="feature__title">Access items anytime</p>
                      <p className="feature__sub-text">Manage your inventory on any computer, tablet or phone.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="feature">
                  <div className="feature__wrapper is-clearfix">
                    <div className="is-pulled-left">
                      <img className="feature__icon" src={activity} alt="Activity tracker" />
                    </div>
                    <div className="feature__text is-pulled-left">
                      <p className="feature__title">Activity tracker</p>
                      <p className="feature__sub-text">Remain secure by always knowing what’s been changed, when and by whom.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
