import React from 'react';

export const capitalizeAllWords = (sentence) => sentence.split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export const generateUsername = (firstName, lastName) => {
  const userName = `${firstName.toLowerCase()}${capitalizeAllWords(lastName.toLowerCase())}`;
  return userName;
};

export const formatDate = (dateString) => {
  const event = new Date(dateString)
    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return event;
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

export const summaryColumns = (item) => {
  const classNames = `summary-icon-wrapper ${item.id}`;
  return (
    <div key={item.id} className="column">
      <div className="card">
        <div className="card-content">
          <div className="icon-group">
            <div className={`icon-bg ${item.id}`} />
            <div className={classNames}>
              <img className="summary-icon responsive" src={item.iconSrc} alt={item.altText} />
            </div>
          </div>
          <div className="summary-description">
            <p className="summary-description__title">{item.title}</p>
            <p className="summary-description__sub-text">{item.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const activtyList = (activity, idx) => (
  <div key={idx} className="activity">
    <div className="activity--left">
      <span className="activity__name">{activity.name}</span>
      <span className="activity__item">{activity.item.name}</span>
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
      <span className="activity__time">{formatDate(activity.updatedAt)}</span>
    </div>
  </div>
);
