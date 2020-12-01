import React from 'react';

import './landingPage.scss';
import ConnectedNavbar from '../navbar';
import Footer from '../footer';
import ImageLoader from '../imageLoader';
import Button from '../button';
import { dashboard as hiRes, featureColumns } from '../../utils';
import { featuresList } from '../../utils/cardBuilder';
import lowRes from '../../assets/images/trakkr-dashboard-blurred.png';

const LandingPage = () => (
  <div className="page-wrapper">
    <ConnectedNavbar />
    <div className="page-header is-flex is-horizontal-center">
      <div className="page-header__text-wrapper">
        <h3 className="page-header__title-text">
          Your Complete
          <br />
          Collection Tracking Solution
        </h3>
        <h5 className="page-header__sub-text">All of your stuff. All in one place.</h5>
      </div>
    </div>
    <div className="page-intro">
      <div className="columns is-marginless is-gapless">
        <div className="column">
          <div className="is-flex is-horizontal-center page-intro-text-wrapper">
            <h3 className="page-intro__text">
              A simple inventory
              <br />
              software for business
              <br />
              and teams to stay on top
              <br />
              of their stuff.
            </h3>
          </div>
        </div>
        <div className="column">
          <div className="is-flex is-horizontal-center photo-area-bg">
            <div className="product-photo-wrapper">
              <ImageLoader
                classString="product--photo responsive"
                hiResSource={hiRes}
                lowResSource={lowRes}
                altText="Trakkr illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="product-features">
      <div className="">
        <p className="section-title">Intuitive features</p>
        <div className="container">
          <div className="columns is-tablet is-marginless">
            {featuresList.map((feature) => featureColumns(feature))}
          </div>
        </div>
      </div>
    </div>
    <div className="page-call-to-action">
      <div className="page-call-to-action-wrapper">
        <p className="cta-title">Experience inventory management at its finest.</p>
        <p className="cta-sub-text">Get sorted today!</p>
        <Button path="/signup" label="Get started" type="round" />
      </div>
    </div>
    <Footer />
  </div>
);

export default LandingPage;
