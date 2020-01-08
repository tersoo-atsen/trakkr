import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ImageLoader.scss';

class ImageLoader extends Component {
  state = {
    loaded: false,
  };

  onLoadHandler = () => {
    this.setState({ loaded: true });
  }

  renderLoader = (loaded, lowResSource, altText, className) => (
    <img
      className={className}
      src={lowResSource}
      alt={altText}
    />
  );

  render() {
    const { loaded } = this.state;
    const {
      hiResSource,
      lowResSource,
      altText,
      classString,
    } = this.props;

    return (
      <div className="image-loader-wrapper">
        {!loaded ? this.renderLoader(loaded, lowResSource, altText, classString) : null}
        <img
          className={classString}
          src={hiResSource}
          alt={altText}
          style={!loaded ? { display: 'none' } : {}}
          onLoad={this.onLoadHandler}
        />
      </div>
    );
  }
}

ImageLoader.propTypes = {
  hiResSource: PropTypes.string.isRequired,
  lowResSource: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  classString: PropTypes.string,
};

ImageLoader.defaultProps = {
  classString: '',
};

export default ImageLoader;
