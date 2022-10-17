import React, {useState} from 'react'
import { Card } from 'react-bootstrap';
import Navbar from '../../components/NavbarReportContent'
import './styles/Sales.css'
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
        console.log(data)
    }
  
    return (
        <div>
            <Navbar/>
            <div className='color-sales'>
                <div>
                    <img src = {logo} alt = "sales" className='salesimg2'></img>
                <div className='sel-month' >
                    <h4>เดือน : <input  type='month' onChange={getMonth}/></h4>
                </div>
                    <Button variant="primary" type="submit" className='submit-button' onClick={() => {setPopUp(true)}}>
                    ยืนยัน
                    </Button>
                    {popUp && <Popup closePopUp={setPopUp}
                    total={total.total}/>}
                </div>  
            </div>
        </div>
    );
  
  }
  export default Salespage