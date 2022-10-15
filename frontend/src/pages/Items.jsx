import React, { useRef,useEffect,useState } from 'react'
import {Navigate,Link} from 'react-router-dom'
import Navbar from '../components/NavbarItem'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Item.css'
import ModalItem from '../components/ModalItem';
import CamModal from '../components/scanner/CamModal';
import Modal from '../components/Modal';

function Items() {
  const [arrayItem,setArrayItem] = useState([]);
  const [openModalType, setOpenModalType] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [itemID, setItemId] = useState("");
  const [camModal, setCamModal] = useState(false);
  const barnum = useRef();
  const [scanBarNum,setScanBarNum] = useState("");
  const [arrayType,setArrayType] = useState([]);
  const filType = useRef();

  useEffect(() => {
    async function GetAllItem() {
      const response1 = await fetch("https://posme.fun:2096/items", {
          method: "GET",
          credentials: "include",
        });
        const alldata = await response1.json();
        console.log(alldata);
        setArrayItem(alldata);
    }
    GetAllItem();
    async function GetAllType() {
      const response2 = await fetch("https://posme.fun:2096/types", {
        method: "GET",
        credentials: "include",
      });
      const alltype = await response2.json();
      console.log(alltype);
      setArrayType(alltype);
    }
    GetAllType();
  },[])

  function PassName(itemid) {
    setItemId(itemid);
  }

  const handleChange = async function () {
    console.log(barnum.current.value);
    console.log(filType.current.value);
    const response_typeid = await fetch("https://posme.fun:2096/types/name/"+filType.current.value, {
      method: "GET",
      credentials: "include",
    });
    const typeid = await response_typeid.json();
    console.log(typeid);
    const response2 = await fetch("https://posme.fun:2096/items/filter", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              keyword : barnum.current.value,
              type_id : typeid,
            }),
          });
          const data = await response2.json();
          console.log(data);
          setArrayItem(data);
  }
  const status = localStorage.getItem('isLoggedIn');
  if (!status) {
    return <Navigate to="/"/>
  }
  return (
    <div>
      <Navbar/>
      <div className="mid">
        <div className="search_container">
          <input className='search' ref={barnum} type="text" placeholder="Search..." onChange={handleChange}/>
          <button className='scanner_btn_Item'  
                onClick={() => {
                  setCamModal(true);
                }}>
                <img className='scanner_btn_img' src={require('../image/barcode-scanner.png')}/>
          </button>
          <div className='item_type'>
            <label className='filter_label'>Item Type : </label>
            <select className='select_type' ref={filType} onChange={handleChange}>
              <option value="0">ทั้งหมด</option>
              {arrayType.map(eachtype => 
              <option value={eachtype.index}>
                {eachtype.type_name}
              </option>
              )}
            </select>
            <button className='add_item_type_btn'
                onClick={() => {
                  setOpenModalType(true);
                }}>
                    จัดการประเภทสินค้า
            </button>
          </div>
        </div>
          {arrayItem.map(eachItem => 
              <button className='item_detail' onClick={() => {
                window.scrollTo(0,0);
                PassName(eachItem._id);
                setOpenModal(true);
              }}>
                <p className='item_barcode'> Barcode : {eachItem.barcode} </p>
                <h2 className='item_name'> {eachItem.name} </h2> 
                <p className='item_price'> price : {eachItem.price.toFixed(2)} ฿</p> 
              </button> 
            )}
            {openModal && <ModalItem closeModal={setOpenModal} itemID={itemID} setArrayItem={setArrayItem}/>}
      </div>
      <Link to={'/store/items/additem'}>
        <img className='add_button' src={require('../image/plus.png')} alt='Add-Item'/>
      </Link>
        {openModalType && <Modal 
            closeModal={setOpenModalType}
            setEditArrayType={setArrayType} 
            />} 
        
        {camModal && <CamModal 
            closeModal={setCamModal}
            setScanBarNum={setScanBarNum}
            barnum={barnum}
            setArrayItem={setArrayItem}
            />} 
    </div>
  )
}

export default Items