import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"; 
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CurrentCard} from "../contexts/CurrentCard";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";

function App() {
  const [isEditAvatarClick, setEditAvatarClick] = React.useState(false);
  const [isEditProfileClick, setEditProfileClick] = React.useState(false);
  const [isAddPlaceClick, setAddPlaceClick] = React.useState(false);
  const [selectedCard, setselectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [currentCards, setCurrentCards] = React.useState([]);

  //const [loggedIn, setloggedIn] = React.useState(false); // статус пользователя(вошел в систему или нет)

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    
    (isLiked
    ? api.deleteLikeCard(card._id)
    : api.addLikeCard(card._id))

    .then((newCard) => {
      setCurrentCards((state) => state.map((c) => (c._id === card._id ? newCard : c))
      );
    })
    .catch((err) => {
      console.log(err);
    })
}
function handleCardDelete(card) {

  api.deleteCard(card._id)
  .then((res) => {
    setCurrentCards((state) => state.filter((c) => c._id !== card._id));
    // с - объект карточки
    // state - массив карточек до удаления 
})
  .catch((err) => {
    console.log(err);
})
}

function handleUpdateUser(data) {
  api.editInfoUser(data.name, data.about)
  .then((res) => {
    setCurrentUser(res)
    closeAllPopups()
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleUpdateAvatar(data) {
  api.editAvatarUser(data.avatar)
  .then((res) => {
    setCurrentUser(res)
    closeAllPopups()
  })
  .catch((err) => {
    console.log(err);
  })
}

function handleAddPlaceSubmit(data) {
  api.createInitialCards(data.name, data.link)
  .then((newCard) => {
    setCurrentCards([newCard, ...currentCards])
    closeAllPopups()
  })
  .catch((err) => {
    console.log(err);
  })
}

  React.useEffect(() => {
    Promise.all([api.getInfoUser(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser(res[0]);
        setCurrentCards([...res[1]]);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeAllPopups = () => {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setselectedCard(null);
  };

  const handleEditAvatarClick = () => {
    return setEditAvatarClick(!isEditAvatarClick);
  };

  const handleEditProfileClick = () => {
    return setEditProfileClick(!isEditProfileClick);
  };

  const handleAddPlaceClick = () => {
    return setAddPlaceClick(!isAddPlaceClick);
  };

  const handleCardClick = (card) => {
    setselectedCard(card);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentCard.Provider value={currentCards}>
      <BrowserRouter>
        
      <div className="page">
      <Header /> 

      <Login />

      <Routes>

        <Route path="/" element={
          <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick} 
          onCardLike={handleCardLike} 
          onCardDelete={handleCardDelete}/>
          }/>

      <Route path="/sign-up" />
      <Route path="/sign-in" />
       </Routes>

      <Footer />

      <EditProfilePopup 
      isOpen={isEditProfileClick} 
      onClose={closeAllPopups} 
      onUpdateUser={handleUpdateUser}/>

      <AddPlacePopup 
      isOpen={isAddPlaceClick} 
      onClose={closeAllPopups} 
      onUpdatePlace={handleAddPlaceSubmit}/>

      <EditAvatarPopup 
      isOpen={isEditAvatarClick} 
      onClose={closeAllPopups} 
      onUpdateAvatar={handleUpdateAvatar}/>

      <ImagePopup 
      card={selectedCard} 
      onCardClick={handleCardClick} 
      onClose={closeAllPopups}/>

    </div>
    </BrowserRouter>
    </CurrentCard.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
