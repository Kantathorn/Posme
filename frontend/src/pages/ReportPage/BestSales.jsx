import { React, useEffect, useState } from "react";
import Navbar from '../../components/NavbarReportContent'
import { Card } from "react-bootstrap";
import Calendar from "react-calendar";
import DatePicker from '../../components/DateRangePicker'
import './styles/BestSales.css'
import logo from '../../image/bestseller.png'

function Bestseller() {
    const [total, setTotal] = useState([]);
    
    const [monthYear, setmonthYear] = useState("");
    const [buttonColor1, setButtonColor1] = useState(false);
    const [buttonColor2, setButtonColor2] = useState(false);
    let defaultdate = null;
  
  
    async function sortRevenue() {
      const sendData = {
        date: monthYear,
        sort: "total_sales",
      };
      const response = await fetch("https://posme.fun:2096/bills/bestselling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sendData),
      });
      const data = await response.json();
      console.log(data);
      setTotal(data);
      setButtonColor2(true);
      setButtonColor1(false);
    }
  
    async function sortAmount() {
      const sendData = {
        date: monthYear,
        sort: "amount",
      };
      const response1 = await fetch("https://posme.fun:2096/bills/bestselling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sendData),
      });
      const data1 = await response1.json();
      console.log(data1);
      setTotal(data1);
      setButtonColor2(false);
      setButtonColor1(true);
    }
  
    const handleChange = async function(e) {
      const date = e.target.value;
      console.log(date);
      setmonthYear(date);
      console.log(monthYear);
      defaultdate = date;
      const sendData = {
        date: defaultdate,
        sort: "total_sales",
      };
      const response = await fetch("https://posme.fun:2096/bills/bestselling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(sendData),
      });
      setButtonColor2(true);
      const data = await response.json();
      console.log(data);
      setTotal(data);
    }
  
    const handleClickAmount = async function() {
      sortAmount();
    }
    const handleClickRevenue = async function() {
      sortRevenue();
    }
  
    return (
        <div>
            <Navbar/>
            <div className="color-best">
                <div className="best-seller2">
                    <img
                        src={logo}
                        alt=""
                        className="bestsellerimg2"
                        />
                </div>
                <div className="sel-month">
                    <input type="month" onChange= {handleChange}/>
                </div>
                <div className="sort">
                    <span className="sort-font">จัดเรียงโดย</span>
                    <button
                        className="sort-Amount"
                        onClick={handleClickAmount}
                        style={{ backgroundColor: buttonColor1 ? "#EAC43D" : "white" }}
                        >
                        จำนวน
                    </button>
                    <button
                        className="sort-Revenue"
                        onClick={handleClickRevenue}
                        style={{ backgroundColor: buttonColor2 ? "#EAC43D" : "white" }}
                        >
                        ยอดขายรวม
                    </button>
                </div>
                {total.map((listItem) => (
                    <Card className="list-item">
                    <h1>สินค้า: {listItem.item_name}</h1>
                    <h2>จำนวน: {listItem.amount} ชิ้น</h2>
                    <h2>ยอดขายรวม: {listItem.total_sales} ฿</h2>
                    </Card>
                ))}
                {/* <div className="fill_empty">
                x
                </div> */}
            </div>
        </div>
    );
    }
  
  export default Bestseller;