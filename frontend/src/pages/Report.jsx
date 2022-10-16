import React from 'react'
import Navbar from '../components/NavbarUser'
import { Navigate,Link } from 'react-router-dom'
import './styles/Report.css'
import salesLogo from '../image/sales.png'
import bestsalesLogo from '../image/bestseller.png'
import ppLogo from '../image/receipt.png'

function Reports() {
  return (
    <div>
      <Navbar/>
      <div className='sales_button'>
        <Link to='/store/reports/sales'>
            <div className='sales-box'>
              <img src={salesLogo}
                   alt="Sales" 
                   width="150"
                   className="sales-logo"/>
              <span> ยอดขาย </span>
            </div>
        </Link>
        <Link to='/store/reports/best_seller'>
          <div className='best-box'>
            <img src={bestsalesLogo}
                 alt="bestsales" 
                 width='140'
                 className = "best-photo2"/>
            <span> สินค้าขายดีประจำเดือน </span>
          </div>
        </Link>
        <Link to="/store/reports/receipt">
          <div className='pay-box'>
            <img src={ppLogo}
                 alt="edit pp" 
                 width='140'
                 className='pay-logo2'/>
            <span> ใบเสร็จย้อนหลัง </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Reports