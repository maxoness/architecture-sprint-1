import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import Card from "./Card";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";

import '../blocks/places/places.css';
import '../blocks/card/card.css';

function CardList() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  function closePopup() {
    setSelectedCard(null)
    setIsAddPlacePopupOpen(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closePopup();
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    // clean up controller
    let isSubscribed = true;

    api
      .getAppInfo()
      .then(([cards, userData]) => {
        if (isSubscribed) {
          setCurrentUser(userData);
          setCards(cards)
        }
      })
      .catch((err) => console.log(err));

    return () => (isSubscribed = false)
  }, []);

  function onClickAddButton() {
    setIsAddPlacePopupOpen(true)
  }

  return (
    <>
      <section className="add-button page__section">
        <button className="places__add-button" type="button" onClick={onClickAddButton}></button>
      </section>
      <ul className="places__list">
        {
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
      </ul>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={closePopup}
      />
      <ImagePopup card={selectedCard} onClose={closePopup} />
    </>
  )
}

export default CardList;