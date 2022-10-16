import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import styles from "./styles/PreviousReceipt.module.css";
import Navbar from "../../components/NavbarReportContent"

const PreviousReceipt = function () {
  const [allBills, setAllBills] = useState([]);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const receipt_no = searchParams.get("receipt_no");
  const navigate = useNavigate();
  const dateRef = useRef();
  const id = params.id;

  useEffect(() => {
    const getAllBills = async function () {
      const response = await fetch("https://posme.fun:2096/bills", {
        method: "GET",
        credentials: "include",
      });
      // console.log(response)
      const data = await response.json();
      console.log(data);
      setAllBills(data);
    };
    getAllBills();
  }, []);

  // useEffect(() => {
  //   console.log(receipt_no)
  //   if (receipt_no) {
  //     // navigate(`/bills/receipt_no=${receipt_no}`);
  //     navigate(`/bills/id/${receipt_no}`);

  //   }
  // }, [navigate,receipt_no]);

  const gotoPost = function (id) {
    console.log(id);
    // setSearchParams({receipt_no: id})
    navigate(`/bills/id/${id}`);
  };

  const genAllBills = function (allBills) {
    return allBills.map((bill) => {
      return (
        <li
          key={bill._id}
          className={styles.receipt_box}
          onClick={gotoPost.bind(this, bill._id)}
          >
          <p className={styles.receipt_no}>หมายเลขใบเสร็จ: {bill._id}</p>
          <div className={styles.receipt_info_box}>
            <p className={styles.date}>วันที่: {bill.date}</p>
            <p className={styles.price}>{bill.cash}฿</p>
          </div>
        </li>
      );
    });
  };

  const submitForm = async function (e) {
    e.preventDefault();
    const date = dateRef.current.value;
    // console.log(date)
    const response = await fetch(`https://posme.fun:2096/bills?date=${date}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    setAllBills(data);
  };
  // console.log(allBills);
  return (
    <div>
      <Navbar/>
      <section className={styles.section_prev_receipt}>
        <div className={styles.container}>
          <div className={styles.month_box}>
            <label htmlFor="month">Search by date:</label>
            <form action="#" onChange={submitForm}>
              <input type="date" name="month" id="month" ref={dateRef} />
            </form>
          </div>
          <ul className={styles.all_receipt_box}>
            <p className={styles.receipt_heading}>Receipt No.</p>
            {genAllBills(allBills)}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PreviousReceipt;