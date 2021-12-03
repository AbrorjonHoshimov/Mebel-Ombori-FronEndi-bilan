import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const Product = () => {
    const [prType, setPrType] = useState([])
    const [product, setProduct] = useState([])
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
            setPrType(res.data)

        })
    }
    useEffect(() => {
        getPrType()
        getProduct()

    }, [])

    const openModal = () => {
        setDisable(!disable)
    }
    console.log(currentClient)
    const saveClient = (event,values) => {
        if (!currentClient) {
            axios.post(API_PATH + "product/add", values,tokenHeader).then(res => {
                toast.success(res.data.message)
                getProduct()

            })
        }else {
            axios.put(API_PATH+"product/edit/"+currentClient.id,values,tokenHeader).then(res=>{
                getProduct()

            })
            setcurrentClient(undefined)
        }
        openModal()
    }

    function deleteClient(value) {
        axios.delete(API_PATH + "product/" + value.id,tokenHeader).then(res => {
            getProduct()
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
        <div>
            <button className={'btn btn-success '} style={{margin: '20px 0'}} onClick={openModal}>Qo'shish</button>

            <Modal isOpen={disable}>
                <ModalHeader toggle={() => {
                    openModal()
                }}>
                    Maxsulot qoshish
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>
                        {/* With AvField */}
                        {/*<AvField type="checkbox" name="active" label="Active" value="false"/>*/}
                        {/* With AvGroup AvInput and AvFeedback to build your own */}

                        <AvField name="nameUz" label="NameUz" required  value={currentClient ? currentClient.nameUz : ""}/>
                        <AvField name="nameRu" label="NameRu" required value={currentClient ? currentClient.nameRu : ""}/>
                        <AvField type="select" name="productTypeId" label="Option" value={currentClient ? currentClient.productTypeId : ""}
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Maxsulot turini tanlang</option>
                            {prType.map(((value, index) => <option value={value.id}>{value.nameUz}</option>))}

                                {/*<option>2</option>*/}
                                {/*<option>3</option>*/}
                                {/*<option>4</option>*/}
                                {/*<option>5</option>*/}
                        </AvField>
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
                    <Button onClick={() => deleteClient(currentClient)} >xa</Button>
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
                        Rasm
                    </th>
                    <th>
                        NomiUz
                    </th>
                    <th>
                        NomiRu
                    </th>
                    <th>
                        Maxsulot turi
                    </th>

                    <th>
                        Operations
                    </th>

                </tr>
                </thead>
                <tbody>
                {product.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td><img src={"#"}/></td>
                        <td>{value.nameUz}</td>
                        <td>{value.nameRu}</td>
                        <td>{value.productType.nameUz}</td>
                        <td>
                            <button className={"btn btn-warning"} onClick={()=>editClientRoad(value)}>edit</button>
                            <button className={"btn btn-danger"} onClick={() => deleteClientRoad(value)}>delete</button>
                        </td>
                    </tr>
                })}
                </tbody>
            </Table>
            
        </div>
    );
};

export default Product;