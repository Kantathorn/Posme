import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import check from '../../image/checked.png'


function ModalAddCart(props)  {
    const {closeModal,closeFinishModal, bill_id} = props;
    console.log(bill_id);
    

  return (
    <div className='background'>
        <div className="modal_container3">
            <button className='close_btn' onClick={() => {closeFinishModal(false);}}>
              <h1>x</h1>
            </button>
            <img src={check} alt='check' />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                window.location.href='https://posme.fun:8443/receipt/id/' + bill_id;
                }}
            >แสดงใบเสร็จ</button>
            <button onClick={() => {closeFinishModal(false);
                                    closeModal(false);}}>เสร็จสิ้น</button>
            {/* <button onClick={closeFinishModal(false)}>เสร็จสิ้น</button> */}

        </div>
    </div>
  )
}

export default ModalAddCart