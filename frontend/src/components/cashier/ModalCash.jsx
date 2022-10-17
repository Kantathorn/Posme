import React, { useRef, useState } from "react";
import styles from "./modalcash.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import ModalFinish from './ModalFinish';

const ModalCash = function (props) {
  const {totalAmount, cartItems, closeModal} = props;
  const [money, setMoney] = useState(false);
  const [billData, setBillData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [finishModal, setFinishModal] = useState(false);
  const moneyref = useRef();
  const navigate = useNavigate();
  const [alertColor, setAlertColor] = useState("error");
  console.log(totalAmount);

  const getMoney = function () {
    setMoney(moneyref.current.value);
  };

  const genBill = async function (e) {
    e.preventDefault();
    
    
    let quan = []
    for (let i of cartItems) {
      quan.push({
        _id: i._id,
        amount: i.quantity
      })
    }

    console.log(quan)

    if (moneyref.current.value < totalAmount) {
      setErrorMessage("จำนวนเงินไม่ถูกต้อง");
      setAlertColor("error");
      console.log("XXXXXXXX");
    }
    else {
      const response = await fetch("https://posme.fun:2096/bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payment_method: "cash",
          cash: moneyref.current.value,
          quantity: quan, // เอารูปแบบ array นี้มาใส่
        }),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      // navigate(`/bills/id/${data.bill_id}`, {
        //   // state: { total_amount: props.cash, money: money },
        //   state: { total_amount: totalAmount, money: money },
        // });
        // closeModal(false);
      setBillData(data);
      setFinishModal(true);
      };
    }
      

  
  
  return (
    <div className="background">
      <div className="modal_container">

      <button className='close_btn' onClick={() => {closeModal(false);}}>X</button>
        <div className={styles.main}>
          <div className={styles.center}>
            <form>
              <div>
                <label className={styles.label} for="inputcash">
                  รับมา:{" "}
                </label>
                <input
                  className={styles.input3}
                  id="inputcash"
                  type="text"
                  inputmode="numeric"
                  placeholder="รับมา (Baht)"
                  ref={moneyref}
                  onChange={getMoney}

                  ></input>
              </div>

              <div className={styles.textbox}>
                <p className={styles.text}>Total</p>
                <p>{totalAmount}฿</p>
                {/* <p>{props.cash}฿</p> */}

              </div>

              <div className={styles.textbox2}>
                <p className={styles.text}>เงินทอน</p>
                {money && <p>{money - totalAmount}฿</p>}
                {/* {money && <p>{money - props.cash}฿</p>} */}

              </div>

              <div className={styles.buttom}>
                {/* <input type="button" className={styles.button} onClick={getBill} value="แสดงใบเสร็จ"/> */}
                <input type="button" className={styles.button} onClick={genBill} value="ยืนยัน"/>
              </div>
            </form>
          </div>
        </div>
      </div>
      {finishModal && <ModalFinish closeModal={closeModal} closeFinishModal={setFinishModal} bill_id={billData.bill_id}/>}
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
  );
};
export default ModalCash;