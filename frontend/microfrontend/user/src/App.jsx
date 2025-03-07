import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import api from "./utils/api.js";
import Profile from "./components/Profile.js";
import "./index.css";


function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const onCloseAllPopupsEvent = new Event("onCloseAllPopups", {
    composed: true,
  });
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);

      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        <div>Name: cards</div>
        <div>Framework: react</div>
        <div>Language: JavaScript</div>
        <div>CSS: Empty CSS</div>
      </div>
      <section className="places page__section">
        <Profile />
      </section>
    </>
  );
}

const AppWrapper = () => (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

ReactDOM.render(<AppWrapper />, document.getElementById("app"));
