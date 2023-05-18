import React from 'react';

const Profile = () => {
  const profile = sessionStorage.getItem('profile');
  const username = sessionStorage.getItem('user').username;

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {username}</p>
      {profile && (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
         
        </div>
      )}
    </div>
  );
};

export default Profile;
