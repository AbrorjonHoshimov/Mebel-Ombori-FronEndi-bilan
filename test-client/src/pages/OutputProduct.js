import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const OutputProduct = () => {
    const [client, setClient] = useState([])
    const [outputProduct, setOutputProduct] = useState([])
    const [prType, setPrType] = useState([])
    const [product, setProduct] = useState([])
    const [disable, setDisable] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [currentClient, setcurrentClient] = useState(undefined)


    const getClient = () => {
        axios.get(API_PATH + 'client/list',tokenHeader).then(res => {
            // console.log(res.data)
            setClient(res.data)
        })
    }
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
    const getOutputProduct = () => {
        axios.get(API_PATH + 'outputProduct/list', tokenHeader).then(res => {
            // console.log(res.data)
            setOutputProduct(res.data)
        })
    }
    useEffect(() => {
        getClient()
        getProduct()
        getPrType()
        getOutputProduct()
    }, [])

    const openModal = () => {
        setDisable(!disable)
    }
    const saveClient = (event, values) => {
        if (!currentClient) {
            axios.post(API_PATH + "outputProduct/add", values, tokenHeader).then(res => {
                toast.success(res.data.message)
                getOutputProduct()
            })
        } else {
            axios.put(API_PATH + "outputProduct/" + currentClient.id, values, tokenHeader).then(res => {
                getOutputProduct()
            })
            setcurrentClient(undefined)
        }
        openModal()
    }

    function deleteClient(value) {
        axios.delete(API_PATH + "outputProduct/" + value.id, tokenHeader).then(res => {
            getOutputProduct()
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
                    Tayyor Maxsulotdan chiqim qilish
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>
                        {/* With AvField */}
                        {/*<AvField type="checkbox" name="active" label="Active" value="false"/>*/}
                        {/* With AvGroup AvInput and AvFeedback to build your own */}

                        <AvField type="select" name="clientId" label="Option"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Mijozni tanlang</option>
                            {client.map(((value, index) => {
                                return <option value={value.id}>{value.name}</option>
                            }))}
                        </AvField>
                        <AvField type="select" name="productId" label="Option"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Maxsulot Nomini Tanlang</option>
                            {product.map(((value, index) => {
                                return <option value={value.id}>{value.nameUz}</option>
                            }))}
                        </AvField>
                        <AvField type="select" name="productTypeId" label="Option"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Maxsulot turini tanlang tanlang</option>
                            {prType.map(((value, index) => {
                                return <option value={value.id}>{value.nameUz}</option>
                            }))}
                        </AvField>
                        <AvField name="amount" label="Maxsulot miqdori" required value={currentClient ? currentClient.amount : ""}/>
                        <AvField name="price" label="Maxsulot Narxi" required value={currentClient ? currentClient.price : ""}/>
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
                        Mijoz
                    </th>
                    <th>
                        Maxsulot nomi
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
                        Jami Summa
                    </th>
                    <th>
                        Amallar
                    </th>

                </tr>
                </thead>
                <tbody>
                {outputProduct.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.client.name}</td>
                        <td>{value.product.nameUz}</td>
                        <td>{value.productType.nameUz}</td>
                        <td>{value.amount}</td>
                        <td>{value.price}</td>
                        <td>{value.price*value.amount}</td>
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

export default OutputProduct;