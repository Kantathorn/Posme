import React, {useState} from 'react'
import { Card } from 'react-bootstrap';
import Navbar from '../../components/NavbarReportContent'
import './styles/Sales.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Popup from '../../components/SalesPopup'
import logo from '../../image/sales.png'
import Button from 'react-bootstrap/Button'

const Salespage=()=> {
    const [popUp,setPopUp] = useState(false);
    const [total,setTotal] = useState('');
    const getMonth = async function(e) {
        const date = e.target.value
        const sendData = {
          'date': date
        }
        const response = await fetch('https://posme.fun:2096/bills/total',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body:JSON.stringify(sendData)
        })
        const data = await response.json()
        setTotal(data)
        // console.log(data)
    }
  
    return (
        <div>
            <Navbar/>
            <div className='color-sales'>
              <img src = {logo} alt = "sales" className='salesimg2' width='250'></img>
                <div className='sel-month' >
                  เดือน: <input className='picker' type='month' onChange={getMonth}/>
                </div>
                <button variant="primary" type="submit" className='btn btn-warning selectBut' onClick={() => {setPopUp(true)}}>
                  ยืนยัน
                </button>
                {popUp && <Popup closePopUp={setPopUp} total={total.total}/>}
            </div>
        </div>
    );
  
  }
  export default Salespage