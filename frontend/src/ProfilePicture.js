import React from 'react';
import './ProfilePicture.css';

const ProfilePicture = ({ src, alt }) => {
  return (
    <div className="profile-picture-container">
      <img src={src} alt={alt} className="profile-picture" />
      {/* <div className="profile-verified">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
        Verified
      </div> */}
    </div>
  );
};

export default ProfilePicture;
