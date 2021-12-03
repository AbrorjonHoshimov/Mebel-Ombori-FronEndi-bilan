import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const InputProduct = () => {

    const [prType, setPrType] = useState([])
    const [product, setProduct] = useState([])
    const [inputProduct, setInputProduct] = useState([])
    const [disable, setDisable] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [currentClient, setcurrentClient] = useState(undefined)

    const getProduct = () => {
        axios.get(API_PATH + 'product/list',tokenHeader).then(res => {
            // console.log(res.data)
            setProduct(res.data)
        })
    }
    const getPrType = () => {
        axios.get(API_PATH + 'productType/list',tokenHeader).then(res => {
            // console.log(res.data)
            setPrType(res.data)
        })
    }
    const getInputProduct = () => {
        axios.get(API_PATH + 'inputProduct/list', tokenHeader).then(res => {
            // console.log(res.data)
            setInputProduct(res.data)

        })
    }
    useEffect(() => {
        getInputProduct()
        getProduct()
        getPrType()
    }, [])

    const openModal = () => {
        setDisable(!disable)
    }
    const saveClient = (event, values) => {
        if (!currentClient) {
            axios.post(API_PATH + "inputProduct/add", values, tokenHeader).then(res => {
                toast.success(res.data.message)
                getInputProduct()
            })
        } else {
            axios.put(API_PATH + "inputProduct/" + currentClient.id, values, tokenHeader).then(res => {
                getInputProduct()
            })
            setcurrentClient(undefined)
        }
        openModal()
    }

    function deleteClient(value) {
        axios.delete(API_PATH + "inputProduct/" + value.id, tokenHeader).then(res => {
            getInputProduct()
        })
        setcurrentClient(undefined)
        openDeleteModal()
    }

    function openDeleteModal() {
        setdeleteModal(!deleteModal)
    }

    function deleteClientRoad(value) {
        openDeleteModal()
        setcurrentClient(value)
    }

    function editClientRoad(value) {
        setcurrentClient(value)
        openModal()
    }


    return (
        <div className={"container"}>
            <button className={'btn btn-success '} style={{margin: '20px 0'}} onClick={openModal}>Qo'shish</button>

            <Modal isOpen={disable}>
                <ModalHeader toggle={() => {
                    openModal()
                }}>
                   Omborga Tayyor Maxsulot Kirimi
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>
                        {/* With AvField */}
                        {/*<AvField type="checkbox" name="active" label="Active" value="false"/>*/}
                        {/* With AvGroup AvInput and AvFeedback to build your own */}

                        <AvField type="select" name="productTypeId" label="Option"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Maxsulot turini tanlang</option>
                            {prType.map(((value, index) => {
                                return <option value={value.id}>{value.nameUz}</option>
                            }))}
                        </AvField>
                        <AvField type="select" name="productId" label="Option"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Maxsulot Nomini Tanlang</option>
                            {product.map(((value, index) => {
                                return <option value={value.id}>{value.nameUz}</option>
                            }))}
                        </AvField>
                        <AvField name="amount" label="Maxsulot miqdori" required value={currentClient ? currentClient.amount : ""}/>
                        <AvField name="price" label="Narxi" required
                                 value={currentClient ? currentClient.price : ""}/>
                        <Button color="success">Save</Button>
                    </AvForm>
                </ModalBody>
            </Modal>
            <Modal isOpen={deleteModal}>
                <ModalHeader toggle={() => {
                    openDeleteModal()
                }}>
                    O'chirishni tasdiqlaysizmi?
                </ModalHeader>
                <ModalBody>
                    <Button onClick={() => deleteClient(currentClient)}>xa</Button>
                    <Button onClick={() => openDeleteModal()}>Yo'q</Button>
                </ModalBody>
            </Modal>
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
                        Maxsulot turi
                    </th>
                    <th>
                        Miqdori
                    </th>
                    <th>
                        Narxi
                    </th>
                    <th>
                        Umumiy summa
                    </th>

                    <th>
                        Sana
                    </th>

                    <th>
                        Amallar
                    </th>

                </tr>
                </thead>
                <tbody>
                {inputProduct.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.product.nameUz}</td>
                        <td>{value.productType.nameUz}</td>
                        <td>{value.amount}</td>
                        <td>{value.price+' $'}</td>
                        <td>{value.price*value.amount+' $'}</td>
                        <td>{value.inputDate}</td>
                        <td>
                            <button className={"btn btn-warning"} onClick={() => editClientRoad(value)}>edit</button>
                            <button className={"btn btn-danger"} onClick={() => deleteClientRoad(value)}>delete</button>
                        </td>
                    </tr>
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default InputProduct;