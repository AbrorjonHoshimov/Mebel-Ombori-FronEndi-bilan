import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {Table} from "reactstrap";

const SuplierInformation = () => {
    let params=useParams();
   const [suplier,setSuplier]=useState([])
    console.log(params)

    function getInformationSuplier(){
        axios.get(API_PATH+'suplier/suplierGetMaterial/'+params.id,tokenHeader).then(res=>{
            setSuplier(res.data)
            console.log(res.data)
        })
    }


    useEffect(()=>{
    getInformationSuplier()

    },[])

    return (
        <div className={"container"}>
            <Table
            >
                <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Taminotchi Nomi
                    </th>
                    <th>
                        Olib Kelgan Xomashyo Nomi
                    </th>
                    <th>
                        Miqdori
                    </th>
                    <th>
                        Sanasi
                    </th>

                </tr>
                </thead>
                <tbody>
                {suplier.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.supplier.name}</td>
                        <td>{value.material.nameUZ}</td>
                        <td>{value.amount}</td>
                        <td>{value.date}</td>

                    </tr>
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default SuplierInformation;