import React from 'react'
import Navbar from '../components/NavbarUser'
import { Navigate,Link } from 'react-router-dom'
import '../App.css'
import './styles/user.css'
import profileLogo from '../image/logo_editProfile.png'
import passwordLogo from '../image/logo_editpass.png'
import ppLogo from '../image/logo_editpp.png'
import delLogo from '../image/logo_deletacc.png'

function Users() {
  const status = localStorage.getItem('isLoggedIn');
  if (!status) {
    return <Navigate to="/"/>
  }
  return (
    <div>
      <Navbar/>
      <div background>
        <Link to='/store/users/edit_profile'>
          <div className='bg-editbox'>
            <div className='edit-box'>
              <img src={profileLogo}
                   alt="Edit Profile" 
                   className="resume-logo"/>
              <span> แก้ไขข้อมูลส่วนตัว </span>
            </div>
          </div>
        </Link>
        <Link to='/'>
          <div className='psswd-box'>
            <img src={passwordLogo}
                 alt="edit password" 
                 className = "lock-photo2"/>
            <span className='psswd-text'> เปลี่ยนรหัสผ่าน </span>
          </div>
        </Link>
        <Link to="/">
          <div className='pay-box'>
            <img src={ppLogo}
                 alt="edit pp" 
                 className='pay-logo2'/>
            <span> เปลี่ยนเบอร์ที่ผูกพร้อมเพย์ </span>
          </div>
        </Link>
        <Link to='/'>
          <div className='delete-box'>
            <img src={delLogo}
            alt="delete acc" 
            className='bin-photo'/>
            <span> ลบบัญชีถาวร </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Users