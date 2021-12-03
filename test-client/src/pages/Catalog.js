import React, {useEffect, useState} from 'react';
import Navbar from "../component/Navbar";
import HeaderComponent from "../component/HeaderComponent";
import {Link} from "react-router-dom";
import ProductWareHouse from "./ProductWareHouse";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import WareHouseMaterial from "./WareHouseMaterial";

const Catalog = () => {
    const [productWareHouse, setProductWareHouse] = useState([])
    const [matwareHouse, setmatwareHouse] = useState([])

    const getWareHouseMat = () => {
        axios.get(API_PATH + 'matWareHouse/list', tokenHeader).then(res => {
            // console.log(res.data)
            setmatwareHouse(res.data)
        })
    }

    const getProductWareHouse = () => {
        axios.get(API_PATH + 'productWareHouse/list', tokenHeader).then(res => {
            // console.log(res.data)
            setProductWareHouse(res.data)
        })
    }
    useEffect(() => {
        getProductWareHouse()
        getWareHouseMat()
    }, [])

    console.log(productWareHouse)
    let sumProduct = productWareHouse.reduce((previousValue, currentValue) => previousValue + currentValue.overalPrice, 0)
    let sumMaterial = matwareHouse.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)

    return (
        <div>
            <div style={{position: 'absolute', zIndex: '3'}}>
                <Navbar/>
            </div>
            <div className={"d-flex"}>
            </div>
            <ul className={"nav justify-content-center"}>
                <li>
                    <button className={"p-1 bg-success text-white my-1 mx-5"}><Link to={"/toProduct"}
                                                                                    className={"text-white"}> Maxsulotlar
                        Bo'limiga O'tish </Link></button>

                </li>
                <li>
                    <button className={"p-1 bg-warning text-white my-1 mx-5"}><Link to={"/toMaterial"}
                                                                                    className={"text-dark"}> Xomashyolar
                        Bo'limiga O'tish </Link></button>
                </li>
                <li>
                    <button className={"p-1 bg-danger text-white my-1 mx-5"}><Link to={"/toSuplier"}
                                                                                   className={"text-dark"}> Taminotchilar
                        Bo'limiga O'tish
                    </Link></button>

                </li>
                <li>
                    <button className={"p-1 bg-dark text-white my-1 mx-5"}><Link to={"/toClient"}
                                                                                   className={"text-white"}>
                        Mijozlar Bo'limiga O'tish</Link></button>
                </li>

            </ul>

            <div style={{display: "flex", justifyContent: 'space-around', margin: '40px 0'}}>
                <div className="card" style={{width: "490px"}}>
                    <div className="card-header fw-bold">Ombordagi Maxsulotlar</div>
                    <div className="card-body"> Maxsulotlarning Umumiy Summasi <p
                        className={'fw-bold'}>{' '+sumProduct+' $'} </p></div>
                </div>
                <div className="card" style={{width: "490px"}}>
                    <div className="card-header fw-bold">Ombordagi Xomashyolar</div>
                    <div className="card-body">Xomashyolarning Umumiy Summasi <p
                        className={'fw-bold'}>{' ' + sumMaterial + ' $'}</p></div>
                </div>
            </div>


            <div style={{display: "flex", justifyContent: 'space-around'}}>
                <div className="card" style={{width: "490px"}}>
                    <div className="card-body"><ProductWareHouse/></div>
                </div>
                <div className="card" style={{width: "490px"}}>
                    <div className="card-body"><WareHouseMaterial/></div>
                </div>
            </div>

        </div>
    );
};

export default Catalog;