import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {Table} from "reactstrap";
import {useNavigate} from "react-router-dom";

const ToSuplier = () => {
    const [supplier, setSupplier] = useState([])
    const history= useNavigate()
    const getSupplier = () => {
        axios.get(API_PATH + 'suplier/list',tokenHeader).then(res => {
            // console.log(res.data)
            setSupplier(res.data)
        })
    }
    useEffect(()=>{
        getSupplier()
    })
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
                        Mijoz Ismi
                    </th>
                    <th>
                        Telefon Raqami
                    </th>

                </tr>
                </thead>
                <tbody>
                {supplier.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}} onClick={()=>{
                        history("/suplier/"+value.id)
                    }
                    }>
                        <td>{index + 1}</td>
                        <td>{value.name}</td>
                        <td>{value.phone}</td>

                    </tr>
                })}
                </tbody>
            </Table>

        </div>
    );
};

export default ToSuplier;