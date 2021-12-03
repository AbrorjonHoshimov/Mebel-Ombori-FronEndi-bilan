import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const InputMaterial = () => {
    const [material, setMaterial] = useState([])
    const [supplier, setSupplier] = useState([])
    const [inputMaterial, setInputMaterial] = useState([])
    const [disable, setDisable] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [currentClient, setcurrentClient] = useState(undefined)

    const getSupplier = () => {
        axios.get(API_PATH + 'suplier/list', tokenHeader).then(res => {
            // console.log(res.data)
            setSupplier(res.data)
        })
    }
    const getMaterial = () => {
        axios.get(API_PATH + 'material/list', tokenHeader).then(res => {
            // console.log(res.data)
            setMaterial(res.data)
        })
    }
    const getInputMaterial = () => {
        axios.get(API_PATH + 'inputMaterial/list', tokenHeader).then(res => {
            // console.log(res.data)
            setInputMaterial(res.data)
        })
    }
    useEffect(() => {
        getMaterial()
        getSupplier()
        getInputMaterial()
    }, [])

    const openModal = () => {
        setDisable(!disable)
    }
    const saveClient = (event, values) => {
        if (!currentClient) {
            axios.post(API_PATH + "inputMaterial/add", values, tokenHeader).then(res => {
                toast.success(res.data.message)
                getInputMaterial()
            })
        } else {
            axios.put(API_PATH + "inputMaterial/" + currentClient.id, values, tokenHeader).then(res => {
                getInputMaterial()
            })
            setcurrentClient(undefined)
        }
        openModal()
    }

    function deleteClient(value) {
        axios.delete(API_PATH + "inputMaterial/" + value.id, tokenHeader).then(res => {
            getInputMaterial()
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
                    Omborga Xomashyo qo'shish
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>
                        {/* With AvField */}
                        {/*<AvField type="checkbox" name="active" label="Active" value="false"/>*/}
                        {/* With AvGroup AvInput and AvFeedback to build your own */}

                        <AvField type="select" name="materialId" label="Option"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Xomashyo turini tanlang</option>
                            {material.map(((value, index) => {
                                return <option value={value.id}>{value.nameUZ}</option>
                            }))}
                        </AvField>
                        <AvField type="select" name="supplierId" label="Option"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Taminotchini tanlang</option>
                            {supplier.map(((value, index) => {
                                return <option value={value.id}>{value.name}</option>
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
                        Miqdori
                    </th>
                    <th>
                        O'lchov birligi
                    </th>
                    <th>
                        Narxi
                    </th>
                    <th>
                        Jami
                    </th>
                    <th>
                        Sana
                    </th>
                    <th>
                        Taminotchi
                    </th>
                    <th>
                        Amallar
                    </th>

                </tr>
                </thead>
                <tbody>
                {inputMaterial.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.material.code+' '+value.material.nameUZ}</td>
                        <td>{value.amount}</td>
                        <td>{value.material.measurement.nameUz}</td>
                        <td>{value.price+' $'}</td>
                        <td>{value.price*value.amount+' $'}</td>
                        <td>{value.date}</td>
                        <td>{value.supplier.name}</td>
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

export default InputMaterial;