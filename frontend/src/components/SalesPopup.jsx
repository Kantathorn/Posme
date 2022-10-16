import {React,useState} from 'react'
import './styles/SalesPopup.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../image/sales.png'

function Popup (Props) {
  const { closePopUp, total } = Props
  const [showModal, setShowModal] = useState(false)
  return (
    <div className='popupval'>
      <div onClick={() => setShowModal(true)}></div>
      <h1 className='value-total'>
        <button className='closeButton btn btn-danger' onClick={() => closePopUp(false)}>
            Close
        </button>
        <img src={logo} alt="logo" className='popup-img'/>
          NET WORTH: {total} Baht
      </h1>
    </div>
  )
}

export default Popup