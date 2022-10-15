import React, { useEffect,useState } from 'react'
import Navbar from '../../components/NavbarUser'
import './styles/EditProfile.css'
import axios from 'axios'
import { Button,Form } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function EditProfile() {
  const [eusername,setEUsername] = useState("")
  const [estorename,setEStorename] = useState("")
  const [eaddress,setEAddress] = useState("")
  const [efname,setEFname] = useState("")
  const [elname,setELname] = useState("")
  const [email,setEMail] = useState("")
  const [etax,setETax] = useState("")
  const [edata,setEdata] = useState("")


  useEffect (() => {
    axios.get("https://posme.fun:2096/auth/user",
      {withCredentials: true}
    ).then((result) =>{
      setEdata(result.data)
      setEStorename(edata.store_name)
      setEAddress(edata.address)
      setEFname(edata.f_name)
      setELname(edata.l_name)
      setEMail(edata.email)
      setETax(edata.tax_id)
    })
  },[])

  useEffect (() => {
    axios.get("https://posme.fun:2096/auth/user",
      {withCredentials: true}
    ).then((result) =>console.log(result.data))
    
  },[])

  let u = edata.username

  const handlesubmit = () => {
    const euser = {
      "username" : eusername,
      "f_name": efname,
      "l_name": elname,
      "store_name": estorename,
      "address": eaddress,
      "email": email,
      "tax_id": etax,
    }
    console.log(euser)
    axios.put("https://posme.fun:2096/auth/edit",euser,{withCredentials: true})
  }

  return (
    <div>
        <Navbar/>
        <div>
            <img src = "https://cdn.discordapp.com/attachments/1015206753857720341/1019079023244099604/resume_1.png" alt = " " 
            className = "resume-page-logo"/>'
            <div className="e-info">
                <span className="fix-u-text">Username : {edata.username} </span>
            </div>
            <Form onSubmit = {handlesubmit}>
                <div className="e-info">
                    <span className="u-text">Store name</span>
                    <input defaultValue= {edata.store_name} className='e-storename' required placeholder='ชื่อร้านค้า' onChange = {e => setEStorename(e.target.value)}/>
                </div>
                <div className="e-info">
                    <span className="u-text">Address</span>
                    <textarea defaultValue= {edata.address}row="3" className='e-address' required placeholder='ที่อยู่' onChange = {e => setEAddress(e.target.value)}/>
                </div>
                <div className="e-info" >
                    <span className="u-text">First-name</span>
                    <input defaultValue= {edata.f_name} className='e-fname' type = "text" pattern = "^[a-zA-Z]*$" required placeholder='ชื่อจริง (ภาษาอังกฤษ)' onChange = {e => setEFname(e.target.value)}/>
                </div>
                <div className="e-info">
                    <span className="u-text">Last-name</span>
                    <input defaultValue= {edata.l_name} className='e-lname'  type = "text" pattern = "^[a-zA-Z]*$" required placeholder='นามสกุล (ภาษาอังกฤษ)' onChange = {e => setELname(e.target.value)}/>
                </div>
                <div className="e-info">
                    <span className="u-text">Email address</span>
                    <input defaultValue= {edata.email} className='e-mail' required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder='hello@aol.com' onChange = {e => setEMail(e.target.value)}/>
                </div>
                <div className="e-info">
                    <span className="u-text">Tax number</span>
                    <input defaultValue= {edata.tax_id} className='e-tax' required placeholder='เลขประจำตัวผู้เสียภาษี 13 หลัก'  type="tel" pattern="[0-9]{13}" onChange={e => setETax(e.target.value)}/>
                </div>
                <Button className='save-editpage' type = 'submit'>
                    SAVE
                </Button>
            </Form>
        </div>
    </div>
  )
}

export default EditProfile