
function InfoTooltip({isOpen, onClose, image, title}) {
  return(
   <div className={`popup ${isOpen ? "popup_opened" : " "}`}>
        <div className="popup__container">
          <img className="popup__status" src={image} alt={title} />
          <h2 className="popup__message">{title}</h2>
          <button className="popup__close" type="button" onClick={onClose}/>
        </div>
      </div>
  )
}

export default InfoTooltip;