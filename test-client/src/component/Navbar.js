import React from 'react';
import './dashbord.css'
import icon from './images/exit.png'
import max from './images/max.png'
import exitt from './images/exitt.png'
import key from './images/key.png'
import product from './images/produc.png'
import order from './images/order.png'
import setting from './images/setting.png'
import acsiya from './images/acsiya.png'
import user from './images/user.png'
import set from './images/set.png'

import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
    const [open, setOpen] = useState(false)
    let navigate = useNavigate();
    return (
        <>
            <img onClick={() => setOpen(!open)} style={{cursor: 'pointer', position: 'absolute', top: '60px',left:"0"}} src={set}
                 alt=""/>
            <div className={open ? "main" : "domain"}>
                <div className='dashboard'><img src={order} alt="" style={{
                    marginLeft: '10px',
                    marginRight: '10px'
                }}/><Link to="/productType" className={'text-dark'}>Maxsulot turlari</Link>
                </div>
                <div className='dashboard'><img src={setting} alt="" style={{
                    marginLeft: '10px',
                    marginRight: '10px'
                }}/><Link to="/measurement" className={'text-dark'}>O'lchov Birligi</Link>
                </div>
                <div className='dashboard'><img src={product} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>
                    <Link to="/product" className={'text-dark'}>Mahsulotlar</Link>
                </div>
                <div className='dashboard'><img src={max} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>
                    <Link to="/client" className={'text-dark'}>Mijozlar</Link>
                </div>
                <div className='dashboard'><img src={acsiya} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>
                    <Link to="/suplier" className={'text-dark'}>Ta'minotchi</Link>
                </div>
                {/*<div className='dashboard'><img src={max} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>Reklama*/}
                {/*</div>*/}
                <div className='dashboard'><img src={user} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>
                    <Link to="/user" className={'text-dark'}>Foydalanuvchilar</Link>
                </div>
                <div className='dashboard'><img src={max} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>
                    <Link to="/material" className={'text-dark'}>Xomashyolar</Link>
                </div>
                {/*<div className='dashboard'><img src={max} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>*/}
                {/*    <Link to="/material">Xomashyolar</Link>*/}
                {/*</div>*/}
                {/*<div className='dashboard'><img src={exitt} alt="" style={{marginLeft: '10px', marginRight: '10px'}}/>Chiqish*/}
                {/*</div>*/}
            </div>
        </>
    )
}
export default Navbar;