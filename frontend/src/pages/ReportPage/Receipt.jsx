import React from "react";
import styles from "./styles/Receipt.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import QRCode from "qrcode.react";

const Receipt = function (props) {
  const params = useParams();
  const location = useLocation();
  const [bill, setBill] = useState(false);
  const [qrCode, setqrCode] = useState("sample");
  const [total, setTotal] = useState(0);
  const id = params.id;

  useEffect(() => {
    const sendData = async function () {
      const response = await fetch(`https://posme.fun:2096/bills/id/${id}`, {
        method: "GET",
        // credentials: 'include',
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      setBill(data);
    };
    sendData();
    setqrCode(`https://posme.fun:8443/receipt/id/${id}`);
  }, [id]);

  const showItem = function () {
    return bill.quantity.map((item) => {
      return (
        <div className={styles.table}>
          <h4 className={styles.merchname}>{item.item_name}</h4>
          <h4>{item.price_each}</h4>
          <h4>{item.quantity}</h4>
          <h4>{item.price_each * item.quantity}</h4>
        </div>
      );
    });
  };

  const check = function () {
    if (location.state?.payment_method === "cash") {
      console.log("1");
    } else {
      console.log("2");
    }
  };

  // console.log(location.state.payment_method)

  return (
    <Fragment>
      {!bill && <p>Loading</p>}
      {/* {check()} */}
      {bill &&
        location.state?.payment_method !== "QR" &&
        location.state?.payment_method !== "cash" && (
          <div className={styles.main}>
            <p className={styles.header}>ใบเสร็จรับเงิน</p>
            <p>เลขที่ใบเสร็จ {bill.receipt_no} </p>
            <p>
              วันที่ {bill.date} {bill.time}
            </p>
            <br></br>
            <hr></hr>
            <h1 className={styles.storeinfo}>ร้าน: {bill.user_id.store_name}</h1>
            <h3 className={styles.storeinfo}>ที่อยู่: {bill.user_id.address}</h3>
            {/* <h3 className={styles.storeinfo}>Faculty of Engineering</h3>
            <h3 className={styles.storeinfo}>Kasersart University</h3> */}
            <h3 className={styles.storeinfo}>
              หมายเลขประจำตัวผู้เสียภาษี: {bill.user_id.tax_id}
            </h3>
            <br></br>
            <hr></hr>
            <div className={styles.table}>
              <h2 className={styles.tableHeader}>รายการสินค้า</h2>
              <h2 className={styles.tableHeader}>ราคาต่อหน่วย(บาท)</h2>
              <h2 className={styles.tableHeader}>จำนวน</h2>
              <h2 className={styles.tableHeader}>จำนวนเงิน(บาท)</h2>
            </div>
            <hr></hr>

            {showItem()}
            {/* <p className={styles.total_price}>ราคารวม: {}บาท</p> */}

            <div className={styles.total}>
              <h2 className={styles.totalPrice}>ราคาสุทธิ์: {bill.quantity.reduce((a, c) => a + c.quantity * c.price_each, 0)} บาท</h2>
              <h2 className={styles.totalPrice}>รับมา: {bill.cash} บาท</h2>
              <h2 className={styles.totalPrice}>เงินทอน: {bill.cash-bill.quantity.reduce((a, c) => a + c.quantity * c.price_each, 0)} บาท</h2>
              <h2 className={styles.totalPrice}>วิธีการชำระเงิน: {bill.payment_method}</h2>
            </div>
            <br></br>
            <br></br>
            <br></br>

            <div className={styles.box}>
              <QRCode value={qrCode} size={150} />
            </div>
          </div>
        )}
      {bill && location.state?.payment_method === "cash" && (
        <div className={styles.main}>
          <p className={styles.header}>ใบเสร็จรับเงิน</p>
          <p>เลขที่ใบเสร็จ {bill.receipt_no} </p>
          <p>
            วันที่ {bill.date} {bill.time}
          </p>
          <br></br>
          <hr></hr>
          <h1 className={styles.storeinfo}>ร้าน: {bill.user_id.store_name}</h1>
          <h3 className={styles.storeinfo}>ที่อยู่: {bill.user_id.address}</h3>
          <h3 className={styles.storeinfo}>
            หมายเลขประจำตัวผู้เสียภาษี: {bill.user_id.tax_id}
          </h3>
          <br></br>
          <hr></hr>
          <div className={styles.table}>
            <h2 className={styles.tableHeader}>รายการสินค้า</h2>
            <h2 className={styles.tableHeader}>ราคาต่อหน่วย(บาท)</h2>
            <h2 className={styles.tableHeader}>จำนวน</h2>
            <h2 className={styles.tableHeader}>จำนวนเงิน(บาท)</h2>
          </div>
          <hr></hr>
      
                  {showItem()}
                  {/* <p className={styles.total_price}>ราคารวม: {}บาท</p> */}
      
                  <div className={styles.total}>
                    <h2 className={styles.totalPrice}>ราคาสุทธิ์: {bill.quantity.reduce((a, c) => a + c.quantity * c.price_each, 0)} บาท</h2>
                    <h2 className={styles.totalPrice}>รับมา: {bill.cash} บาท</h2>
                    <h2 className={styles.totalPrice}>เงินทอน: {bill.cash-bill.quantity.reduce((a, c) => a + c.quantity * c.price_each, 0)} บาท</h2>
                    <h2 className={styles.totalPrice}>วิธีการชำระเงิน: {bill.payment_method}</h2>
                  </div>
                  <br></br>
                  <br></br>
                  <br></br>
      
                  <div className={styles.box}>
                    <QRCode value={qrCode} size={150} />
                  </div>
                </div>
      )}

      {bill && location.state?.payment_method === "QR" && (
                  <div className={styles.main}>
                  <p className={styles.header}>ใบเสร็จรับเงิน</p>
                  <p>เลขที่ใบเสร็จ {bill.receipt_no} </p>
                  <p>
                    วันที่ {bill.date} {bill.time}
                  </p>
                  <br></br>
                  <hr></hr>
                  <h1 className={styles.storeinfo}>ร้าน: {bill.user_id.store_name}</h1>
                  <h3 className={styles.storeinfo}>ที่อยู่: {bill.user_id.address}</h3>
                  {/* <h3 className={styles.storeinfo}>Faculty of Engineering</h3>
                  <h3 className={styles.storeinfo}>Kasersart University</h3> */}
                  <h3 className={styles.storeinfo}>
                    หมายเลขประจำตัวผู้เสียภาษี: {bill.user_id.tax_id}
                  </h3>
                  <br></br>
                  <hr></hr>
                  <div className={styles.table}>
                    <h2 className={styles.tableHeader}>รายการสินค้า</h2>
                    <h2 className={styles.tableHeader}>ราคาต่อหน่วย(บาท)</h2>
                    <h2 className={styles.tableHeader}>จำนวน</h2>
                    <h2 className={styles.tableHeader}>จำนวนเงิน(บาท)</h2>
                  </div>
                  <hr></hr>
      
                  {showItem()}
                  {/* <p className={styles.total_price}>ราคารวม: {}บาท</p> */}
      
                  <div className={styles.total}>
                    <h2 className={styles.totalPrice}>ราคาสุทธิ์: {bill.quantity.reduce((a, c) => a + c.quantity * c.price_each, 0)} บาท</h2>
                    <h2 className={styles.totalPrice}>รับมา: {bill.cash} บาท</h2>
                    <h2 className={styles.totalPrice}>เงินทอน: {bill.cash-bill.quantity.reduce((a, c) => a + c.quantity * c.price_each, 0)} บาท</h2>
                    <h2 className={styles.totalPrice}>วิธีการชำระเงิน: {bill.payment_method}</h2>
                  </div>
                  <br></br>
                  <br></br>
                  <br></br>
      
                  <div className={styles.box}>
                    <QRCode value={qrCode} size={150} />
                  </div>
                </div>
      )}
    </Fragment>
  );
};
export default Receipt;