import React from 'react'

function AddPlaceButton({ onClickAddButton }) {

  return (
    <button className="profile__add-button" type="button" onClick={onClickAddButton}></button>
  )
}

export default AddPlaceButton;