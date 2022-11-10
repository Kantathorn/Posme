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
      <div className='color'>
        <div>
            <button className = "sales">
                <Link to="/store/reports/sales" className='font'>
                <img src = {Sales_logo} alt = "sales logo" className='salesimg'></img>
                 <div className='font-sales'>
                    ยอดขาย
                 </div>
                </Link>
            </button>
        </div>

        <div>
          <button className= 'best-seller'>
              <Link to="/store/reports/best_seller" className='font'>
              <img src = {BestSales_logo} alt ="" className='bestsellerimg'></img>
              <div className='font-bestseller'>
                  สินค้าขายดี
              </div>
              </Link>
          </button>
        </div>
        <div>   
          <button className='receipt'>
            <Link to="/store/reports/receipt" className='font'>
              <img src= {Receipt_logo} alt="" className='receiptimg'></img>
              <div className='font-receipt'>
                  ใบเสร็จ
              </div>
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reports