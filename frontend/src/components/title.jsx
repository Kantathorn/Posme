import React,{ useEffect, useState } from 'react'
import "./styles/component.css"
import { Navigate } from 'react-router-dom'
import logo from '../image/title_logo.png'

const Title = () => {
    let [timeDelay, setTimeDelay] = useState(5);
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeDelay(timeDelay-=1)
            return () => clearInterval(interval);
        }, 1000);
    }, []);

    // console.log(timeDelay)
    return (
        <div className='Title'>
            <div className="fade-out">
                <img src={logo} alt='title-logo' className='logo' />
            </div>
            { timeDelay < 3 && <Navigate to ={'/login'} /> }
        </div>
    )

}

export default Title