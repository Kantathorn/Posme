import React from "react";
import styles from "./Register.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useRef, useState } from "react";
import logo from "../image/logoLarge.png";
import Backdrop from "../components/BackdropRegister";

const Register = function (props) {
  const [wrongRegister, setWrongRegister] = useState(false);
  const navigate = useNavigate();
  const fnameref = useRef();
  const lnameref = useRef();
  const storenameref = useRef();
  const addressref = useRef();
  const emailref = useRef();
  const ppref = useRef();
  const usernameref = useRef();
  const passwordref = useRef();
  const taxref = useRef();

  const closeOverlay = function () {
    setWrongRegister(false);
  };

  const submitHandler = async function (e) {
    e.preventDefault();

    const firstname_input = fnameref.current.value;
    const lastname_input = lnameref.current.value;
    const storename_input = storenameref.current.value;
    const address_input = addressref.current.value;
    const email_input = emailref.current.value;
    const pp_input = ppref.current.value;
    const username_input = usernameref.current.value;
    const password_input = passwordref.current.value;
    const tax_input = taxref.current.value;

    try {
      const response = await fetch("https://posme.fun:2096/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username_input,
          password: password_input,
          store_name: storename_input,
          address: address_input,
          f_name: firstname_input,
          l_name: lastname_input,
          email: email_input,
          tax_id: tax_input,
          promptpay_number: pp_input,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        navigate("/login");
      }
    } catch (err) {
      setWrongRegister(true);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.center}>
        <img
          className={styles.regisLogo}
          src={logo}
          alt="register_logo"
        ></img>
        <form action="#" onSubmit={submitHandler}>
          <div>
            <label className={styles.label} for="personalinfo">
              ชื่อจริง:{" "}
            </label>
            <input
              className={styles.input3}
              id="personalinfo"
              type="text"
              placeholder="firstname"
              ref={fnameref}
            ></input>
          </div>
          <div>
            <label className={styles.label} for="personalinfo">
              นามสกุล:{" "}
            </label>
            <input
              className={styles.input3}
              id="personalinfo"
              type="text"
              placeholder="lastname"
              ref={lnameref}
            ></input>
          </div>
          <div>
            <label className={styles.label} for="personalinfo">
              ชื่อร้านค้า:{" "}
            </label>
            <input
              className={styles.input3}
              id="peronalinfo"
              type="text"
              placeholder="storename"
              ref={storenameref}
            ></input>
          </div>

          <div className={styles.box}>
            <label className={styles.label_address} for="address">
              ที่อยู่:
            </label>
            <textarea
              className={styles.input1}
              id="address"
              name="address"
              rows="4"
              cols="50"
              ref={addressref}
            ></textarea>
          </div>

          <div>
            <label className={styles.label} for="email">
              email :{" "}
            </label>
            <input
              className={styles.input2}
              id="email"
              type="text"
              placeholder="email"
              ref={emailref}
            ></input>
          </div>

          <div>
            <label className={styles.label} for="taxid">
              หมายเลขประจำตัวผู้เสียภาษี:{" "}
            </label>
            <input
              className={styles.input2}
              id="taxid"
              type="text"
              placeholder="taxid"
              ref={taxref}
            ></input>
          </div>

          <div>
            <label className={styles.label} for="promptpay">
              เลขพร้อมเพย์:{" "}
            </label>
            <input
              className={styles.input2}
              id="promptpay"
              type="text"
              placeholder="promtpay number"
              ref={ppref}
            ></input>
          </div>

          <div>
            <label className={styles.label} for="username">
              username:{" "}
            </label>
            <input
              className={styles.input2}
              id="username"
              type="text"
              placeholder="user name"
              ref={usernameref}
            ></input>
          </div>

          <div>
            <label className={styles.label} for="password">
              password:{" "}
            </label>
            <input
              className={styles.input2}
              id="password"
              type="password"
              placeholder="password"
            ></input>
          </div>

          <div>
            <label className={styles.label} for="confirmpassword">
              confirm password:{" "}
            </label>
            <input
              className={styles.input2}
              id="confirmpassword"
              type="password"
              placeholder="confirm password"
              ref={passwordref}
            ></input>
          </div>

          {/* <p><label  className='label' for="bussinessinfo">ที่อยู่:</label></p>
        <textarea className='input1' id="bussinessinfo" name="w3review" rows="4" cols="50"></textarea> */}
          {/* <input className='input2'  type="text" placeholder='email' ></input>
        <input className='input2'  type="text" placeholder='promtpay number' ></input>
        <input className='input2'  type="text" placeholder='username' ></input>
        <input className='input2' type="text" placeholder='password'></input>
        <input className='input2' type="text" placeholder='confirm password'></input> */}
            <button className={`${styles.block} ${styles.register_btn}`}>ลงทะเบียน</button>
        </form>
        {wrongRegister && <Backdrop close={closeOverlay} />}
        <Link to="/login">
            <button className={`${styles.block} ${styles.login_btn}`}>
              กลับสู่หน้า login
            </button>
        </Link>
      </div>
    </div>
  );
};
export default Register;
