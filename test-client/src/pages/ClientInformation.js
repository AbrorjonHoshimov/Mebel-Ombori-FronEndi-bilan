import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {Table} from "reactstrap";

const ClientInformation = () => {
    const param = useParams()
    const [client, setClient] = useState([])
    function getClient() {
        axios.get(API_PATH + 'client/getOneClientFromOutputProduct/' + param.id, tokenHeader).then(res => {
            setClient(res.data)
        })
    }

    useEffect(() => {
        getClient()
    },[])


    console.log(client)

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
                        Olgan Maxsulot Nomi
                    </th>
                    <th>
                        Miqdori
                    </th>
                    <th>
                        Turi
                    </th>
                    <th>
                        Sanasi
                    </th>

                </tr>
                </thead>
                <tbody>
                {client.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.client.name}</td>
                        <td>{value.product.nameUz}</td>
                        <td>{value.productType.nameUz}</td>
                        <td>{value.amount}</td>
                        <td>{value.outDate}</td>
                    </tr>
                })}
                </tbody>
            </Table>

        </div>
    );
};

export default ClientInformation;