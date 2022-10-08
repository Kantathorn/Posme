import React from 'react'
import {Navigate} from 'react-router-dom'
import Navitem from '../components/NavbarItem'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Item.style.css'
function Items() {
  const status = localStorage.getItem('isLoggedIn');
  if (!status) {
    return <Navigate to="/"/>
  }
  return (
    <>
      <Navitem />
    </>
  )
}

export default Items