import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const OutputMaterial = () => {
    const [material, setMaterial] = useState([])
    const [outputMaterial, setOutputMaterial] = useState([])
    const [disable, setDisable] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [currentClient, setcurrentClient] = useState(undefined)


    const getMaterial = () => {
        axios.get(API_PATH + 'material/list', tokenHeader).then(res => {
            // console.log(res.data)
            setMaterial(res.data)
        })
    }
    const getOutputMaterial = () => {
        axios.get(API_PATH + 'otputMaterial/list', tokenHeader).then(res => {
            // console.log(res.data)
            setOutputMaterial(res.data)
        })
    }
    useEffect(() => {
        getMaterial()
        getOutputMaterial()
    }, [])

    const openModal = () => {
        setDisable(!disable)
    }
    const saveClient = (event, values) => {
        if (!currentClient) {
            axios.post(API_PATH + "otputMaterial/add", values, tokenHeader).then(res => {
                toast.success(res.data.message)
                getOutputMaterial()
            })
        } else {
            axios.put(API_PATH + "otputMaterial/" + currentClient.id, values, tokenHeader).then(res => {
                getOutputMaterial()
            })
            setcurrentClient(undefined)
        }
        openModal()
    }

    function deleteClient(value) {
        axios.delete(API_PATH + "otputMaterial/" + value.id, tokenHeader).then(res => {
            getOutputMaterial()
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
                   Ombordagi Xomashyodan Chiqim Qilish
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
                        <AvField name="amount" label="Maxsulot miqdori" required value={currentClient ? currentClient.amount : ""}/>
                        <AvField name="comment" label="Izoh" required value={currentClient ? currentClient.description : ""}/>
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
                        Sana
                    </th>
                    <th>
                        Izoh
                    </th>
                    <th>
                        Amallar
                    </th>

                </tr>
                </thead>
                <tbody>
                {outputMaterial.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.material.code+' '+value.material.nameUZ}</td>
                        <td>{value.amount}</td>
                        <td>{value.material.measurement.nameUz}</td>
                        <td>{value.date}</td>
                        <td>{value.comment}</td>
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

export default OutputMaterial;