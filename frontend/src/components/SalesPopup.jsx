import {React,useState} from 'react'
import './styles/SalesPopup.css'
import logo from '../image/sales.png'

function Popup (Props) {
  const { closePopUp, total } = Props
    const [showModal, setShowModal] = useState(false)
  return (
  
    <div>
    <div onClick={() => setShowModal(true)}>
    </div>
      <h1 className='value-total'>

      <button className='closeButton'
          onClick={() => closePopUp(false)}>
          Close
      </button>
          <img src={logo} alt="logo" className='popup-img'/>
            NET WORTH: {total} Baht
        </h1>
    </div>
  )
}

export default Popup