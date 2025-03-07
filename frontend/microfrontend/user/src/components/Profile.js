import React, { useState, useEffect } from 'react'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/api";
import '../blocks/profile/profile.css';


function Profile () {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const imageStyle = currentUser ? { backgroundImage: `url(${currentUser.avatar})` } : null;

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups()
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!currentUser.name) return null

  return (
    <>
      <div className="profile__image" onClick={handleEditAvatarClick} style={imageStyle}></div>
      <div className="profile__info">
        <h1 className="profile__title">{currentUser.name}</h1>
        <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
        <p className="profile__description">{currentUser.about}</p>
      </div>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
      />

      <EditProfilePopup
        currentUser={currentUser}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />
    </>
  )
}

export default Profile;