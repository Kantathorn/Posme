import React from 'react'
import { useRef } from 'react';
import "./styles/modal.css"
import { useState } from 'react';
import { useEffect } from 'react';
import { Snackbar, Alert } from "@mui/material"

function Modal(props) {
  const typeitem = useRef();
  const [arrayType,setArrayType] = useState([]);
  const [errAdd, setErrAdd] = useState(false);
  const [errtext, setErrtext] = useState();

  const [errorMessage, setErrorMessage] = useState(null)
  const [alertColor, setAlertColor] = useState("error")

  const submitHandler = async function (event) {
    event.preventDefault();
    const typeitem_input = typeitem.current.value;
    const response = await fetch("https://posme.fun:2096/types", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type_name: typeitem_input,
        }),
      });
      const data = await response.text();
      console.log(data);
      setErrtext(response.status);
      console.log(errtext);
      if (response.ok) {
        // window.location.reload(false);
        // props.closeModal(false);
      }
      else {
        setErrAdd(true);
        console.log(errAdd);
        setErrorMessage("รายการสินค้าซ้ำกับรายการที่มีอยู่แล้ว")
        setAlertColor("error")
      }
      GetAllType();
  }
  
  const DeleteInputValue = () => {
    typeitem.current.value = "";
  }
  async function GetAllType() {
    const response2 = await fetch("https://posme.fun:2096/types", {
      method: "GET",
      credentials: "include",
    });
    const alltype = await response2.json();
    console.log(alltype);
    setArrayType(alltype);
    props.setEditArrayType(alltype);
    DeleteInputValue();
  }

  useEffect(() => {
    GetAllType();
  },[])

  async function DeleteType(type_id) {
    await fetch("https://posme.fun:2096/types/"+type_id, {
      method: "DELETE",
      credentials: "include",
    });
    GetAllType();
  }



  return (
    <div className='background'>
        <div className="modal_container">
            <button className='close_add_btn' onClick={() => {
                  props.closeModal(false);
                  }}>
                <img className='close_add_btn_img' src={require('../image/logo_err.png')} alt="close" />
            </button>
            <div className="title">
                <h1>ประเภทสินค้า</h1>
            </div>
            {arrayType.map(eachType =>
            <div className='type'>
              <p className="type_name">{eachType.type_name}</p>
              <button className="btn_del" onClick={() => DeleteType(eachType._id)}>
                <img className='btn_img' src={require('../image/logo_deletacc.png')} alt='Delete' />
              </button>
            </div>
              )}
            <form action='#' onSubmit={submitHandler}>
              <div className="add_type">
                  <input 
                    className='input_add_type'
                    id='new_type' 
                    type="text" 
                    placeholder='เพิ่มประเภทสินค้า'
                    required
                    ref={typeitem}
                    >
                  </input>
                  <div className="submit">
                    <button className='submit_btn' onClick={() => 
                                                              GetAllType}>
                      <img className='submit_btn_img' src={require('../image/plus_green.png')} alt="add type" />
                    </button>
                  </div>
              </div>
            </form>
        </div>

      {
        errorMessage && 
        <Snackbar  open={errorMessage} onClose={() => setErrorMessage(false)} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} autoHideDuration={5000} bodyStyle={{ height: 200, width: 200, flexGrow: 0 }}>
          <Alert onClose={() => setErrorMessage(false)} severity={alertColor} sx={{ width: '100%' }}>
            <div className="errormssg">
            {errorMessage}
            </div>
          </Alert>
        </Snackbar>
      }
        
    </div>
  )
}

export default Modal