import React from 'react';

import { summaryList } from './cardBuilder';
import { GET_SIGNATURE } from '../graphql/queries';

export const capitalizeAllWords = (sentence) => sentence.split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export const generateUsername = (firstName, lastName) => {
  const userName = `${firstName.toLowerCase()}${capitalizeAllWords(lastName.toLowerCase())}`;
  return userName;
};

export const formatTime = (isoDate) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Date(isoDate).toLocaleString('en-US', options);
};

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (itemKey) => JSON.parse(localStorage.getItem(itemKey));

export const removeFromLocalStorage = (itemKey) => {
  const name = JSON.parse(localStorage.getItem(itemKey));
  /* istanbul ignore if */
  if (name !== null) {
    localStorage.removeItem(itemKey);
    return true;
  }
  return false;
};

export const featureColumns = (feature) => {
  const classNames = `feature-icon-wrapper ${feature.id}`;
  return (
    <div key={feature.id} className="column">
      <div className="card">
        <div className="card-content">
          <div className={classNames}>
            <img className="feature-icon" src={feature.iconSrc} alt={feature.altText} />
          </div>
          <p className="feature__title">{feature.title}</p>
          <p className="feature__sub-text">{feature.desc}</p>
        </div>
      </div>
    </div>
  );
};

export const summaryColumns = (userStats) => {
  summaryList[0].value = userStats.itemCount;
  summaryList[1].value = userStats.totalQuantity;
  summaryList[2].value = `$${userStats.totalValue}.00`;

  return summaryList.map((item) => (
    <div key={item.id} className="column">
      <div className="card">
        <div className="card-content">
          <div className="icon-group">
            <div className={`icon-bg ${item.id}`} />
            <div className={`summary-icon-wrapper ${item.id}`}>
              <img className="summary-icon responsive" src={item.iconSrc} alt={item.altText} />
            </div>
          </div>
          <div className="summary-description">
            <p className="summary-description__sub-text">{item.value}</p>
            <p className="summary-description__title">{item.title}</p>
          </div>
        </div>
      </div>
    </div>
  ));
};

export const activtyList = (activity, idx) => (
  <div key={idx} className="activity">
    <div className="activity--left">
      <span className="activity__name">{activity.name}</span>
      <span className="activity__item">{activity.item?.name}</span>
      <span>
        {activity.fields !== null ? (
          <span className="activity__attr">
            &#40;
            {activity.fields.join(' ')}
            &#41;
          </span>
        ) : null}
      </span>
    </div>
    <div className="activity--right">
      <span className="activity__user">{activity.user.firstName}</span>
      <span className="activity__time">{formatTime(activity.createdAt)}</span>
    </div>
  </div>
);

export const isAuthenticated = () => {
  const user = getFromLocalStorage('user');
  return !!user;
};

export const getToken = () => {
  const user = getFromLocalStorage('user');
  return !user ? null : user.token;
};

export const uploadImage = async (file, imageUrl, apolloClient) => {
  const publicId = imageUrl.split('/')[1];
  const sigResponse = await apolloClient.query({
    query: GET_SIGNATURE,
    variables: { publicId },
  });
  const { signature, timestamp } = sigResponse.data.getSignature;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('invalidate', true);
  formData.append('folder', process.env.CLOUDINARY_FOLDER);
  formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
  formData.append('api_key', process.env.CLOUDINARY_API_KEY);
  formData.append('public_id', publicId);
  formData.append('timestamp', timestamp);
  formData.append('signature', signature);
  const options = {
    method: 'POST',
    body: formData,
  };
  try {
    await fetch(`${process.env.CLOUDINARY_URL}`, options);
  } catch (e) {
    return null;
  }
  return 'Done';
};
