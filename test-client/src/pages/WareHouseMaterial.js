import React, {useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {Table} from "reactstrap";

const WareHouseMaterial = () => {
    const [matwareHouse, setmatwareHouse] = useState([])

    const getWareHouseMat = () => {
        axios.get(API_PATH + 'matWareHouse/list', tokenHeader).then(res => {
            // console.log(res.data)
            setmatwareHouse(res.data)
        })
    }

    useState(()=>{
        getWareHouseMat()
    },[])

    return (
        <div className={"container"}>
            <p className={'text-center fw-bold'}>Ombordagi Xomashyolar</p>
            <Table
            >
                <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Nomi
                    </th>
                    <th>
                        Kod
                    </th>
                    <th>
                        Miqdori
                    </th>
                    <th>
                        O'lchov birligi
                    </th>
                    <th>
                        Jami
                    </th>
                </tr>
                </thead>
                <tbody>
                {matwareHouse.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.material.nameUZ}</td>
                        <td>{value.material.code}</td>
                        <td>{value.amount}</td>
                        <td>{value.material.measurement.nameUz}</td>
                        <td>{value.price+'$'}</td>
                    </tr>
                })}
                </tbody>
            </Table>

        </div>
    );
};

export default WareHouseMaterial;