import React, {useEffect, useState} from 'react';
import {Table} from "reactstrap";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {useNavigate} from "react-router-dom";

const ToClient = () => {
    const history=useNavigate()
    const [client, setClient] = useState([])
    const getClient = () => {
        axios.get(API_PATH + 'client/list',tokenHeader).then(res => {
            // console.log(res.data)
            setClient(res.data)
        })
    }
    useEffect(() => {
        getClient()
    }, [])

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
                {client.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}} onClick={()=>{
                    history("/client/"+value.id)
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

export default ToClient;