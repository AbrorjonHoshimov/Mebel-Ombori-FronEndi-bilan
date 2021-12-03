import React, {useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {Table} from "reactstrap";

const ProductWareHouse = () => {
    const [productWareHouse, setProductWareHouse] = useState([])

    const getProductWareHouse = () => {
        axios.get(API_PATH + 'productWareHouse/list', tokenHeader).then(res => {
            // console.log(res.data)
            setProductWareHouse(res.data)
        })
    }

    useState(()=>{
        getProductWareHouse()
    },[])

    return (
        <div className={"container"}>
            <p className={'text-center fw-bold'}>Ombordagi Tayyor Maxsulotlar</p>
            <Table
            >
                <thead>
                <tr>
                    <th>
                        #
                    </th>
                    <th>
                        Maxsulot Nomi
                    </th>
                    <th>
                       Maxsulot Turi
                    </th>
                    <th>
                        Soni
                    </th>
                    <th>
                        Jami
                    </th>
                </tr>
                </thead>
                <tbody>
                {productWareHouse.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.product.nameUz}</td>
                        <td>{value.productType.nameUz}</td>
                        <td>{value.amount}</td>
                        <td>{value.overalPrice+' $'}</td>


                    </tr>
                })}
                </tbody>
            </Table>

        </div>
    );
};

export default ProductWareHouse;