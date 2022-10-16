import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import { Button } from 'react-bootstrap';


function ModalAddCart(props)  {
    const {closeModal, cartItems, setCartItems} = props;

    const barnum = useRef();
    const filType = useRef();

    const [arrayItem, setArrayItem] = useState([]);
    const [arrayType, setArrayType] = useState([]);

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


      const addHandler = (item) => {
            let new_in_cart = {
                _id: item._id,
                name: item.name,
                price: item.price,
                quantity: 1
            }

            if (cartItems.every( vendor => vendor['_id'] !== new_in_cart._id )) {
                setCartItems(prev => [...prev, new_in_cart]);

                closeModal(false);
            } else {
                // 
            }
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


  return (
    <div className='background'>
        <div className="modal_container3">
            <button className='close_btn' onClick={() => {closeModal(false);}}>
              <h1>x</h1>
            </button>
            <div>
      <div className="mid">
        <div className="search_container_cart">
        <div style={{display:' inline-block'}}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', m: 2, display: 'flex', alignItems: 'center', width: 400 }}
          >
            <div style={{display: 'inline'}}>
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
              <InputBase
                sx={{ml: 0.5, mr: 4, flex: 1, p: 1 }}
                placeholder="ค้นหา ชื่อ / บาร์โค้ด"
                inputRef={barnum}
                onChange={handleChange}
              />
            {/* <Divider sx={{ height: 1, m: 0.2}} orientation="vertical" /> */}
        
          </div>  
             
          </Paper>
        </div>

          <div style={{width: '100%', display: 'center'}}>
            <label><span></span>ประเภท &emsp;</label>
            <select className='select_type' ref={filType} onChange={handleChange}>
              <option value="0">ทั้งหมด</option>
              {arrayType.map(eachtype => 
              <option value={eachtype.index}>
                {eachtype.type_name}
              </option>
              )}
            </select>
          </div>
        </div>
          {arrayItem.map(eachItem => 
            <Card sx={{ m:0.25, minWidth: 250 }}>
            <CardContent>
              <div className='item_detail'>
                <Typography sx={{ fontSize: 20, mb: 1 }} color="text.secondary" gutterBottom>
                  {eachItem.barcode}
                </Typography>
                <Typography variant="h4" component="div">
                  {eachItem.name}
                </Typography>
                <Typography sx={{ fontSize: 20, mt: 1 }} color="text.secondary">
                  {eachItem.price.toFixed(2)} บาท
                </Typography>
              </div> 
            <Button onClick={(e) => addHandler(eachItem)}>
                เพิ่ม
            </Button>
            </CardContent>
          </Card>
                  
            )}
      </div>
        </div>
        </div>
    </div>
  )
}

export default ModalAddCart