import React from 'react';
import { Link } from 'react-router-dom';

import './NotFoundPage.scss';

const NotFoundPage = () => (
  <div className="not-found">
    <div className="not-found__text-wrapper">
      <h1 className="not-found__title-text">404</h1>
      <p className="not-found__sub-title-text">We Sincerely apologize</p>
      <p className="not-found__desc-text">The page you are looking for is no longer here, maybe it was never here in the first place. In any case, we are sorry you were sent on a wild goose chase and have already taken steps to get the person responsible fired.</p>
      <Link className="no-found__home-link" to="/">Go home</Link>
    </div>
  </div>
);

export default NotFoundPage;
