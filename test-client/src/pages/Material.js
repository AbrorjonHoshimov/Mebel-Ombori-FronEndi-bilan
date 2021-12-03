import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const Material = () => {
    const [material, setMaterial] = useState([])
    const [measurement, setMeasurement] = useState([])
    const [disable, setDisable] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [currentClient, setcurrentClient] = useState(undefined)

   const getMeasurement=()=>{
        axios.get(API_PATH+"measurement/list",tokenHeader).then(res=>{
            setMeasurement(res.data)
        })
   }
    const getMaterial = () => {
        axios.get(API_PATH + 'material/list', tokenHeader).then(res => {
            // console.log(res.data)
            setMaterial(res.data)
        })
    }
    useEffect(() => {
        getMaterial()
        getMeasurement()
    }, [])

    const openModal = () => {
        setDisable(!disable)
    }
    const saveClient = (event, values) => {
        if (!currentClient) {
            axios.post(API_PATH + "material/add", values, tokenHeader).then(res => {
                toast.success(res.data.message)
                getMaterial()

            })
        } else {
            axios.put(API_PATH + "material/edit/" + currentClient.id, values, tokenHeader).then(res => {
                getMaterial()
            })
            setcurrentClient(undefined)
        }
        openModal()
    }

    function deleteClient(value) {
        axios.delete(API_PATH + "material/" + value.id, tokenHeader).then(res => {
            getMaterial()
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
                    Xomashyo Qo'shish
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>
                        {/* With AvField */}
                        {/*<AvField type="checkbox" name="active" label="Active" value="false"/>*/}
                        {/* With AvGroup AvInput and AvFeedback to build your own */}

                        <AvField name="code" label="Kod" required value={currentClient ? currentClient.code : ""}/>
                        <AvField name="nameUZ" label="NomiUz" required
                                 value={currentClient ? currentClient.nameUZ : ""}/>
                        <AvField name="nameRu" label="NomiRu" required
                                 value={currentClient ? currentClient.nameRu : ""}/>
                        <AvField type="select" name="measurementId" label="Option"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">O'lchov Birligini Tanlang</option>
                            {measurement.map(((value, index) => {
                                return <option value={value.id}>{value.nameUz}</option>
                            }))}
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
                        Kod
                    </th>
                    <th>
                        Rasm
                    </th>
                    <th>
                        Nomi(Uz)
                    </th>
                    <th>
                        Nomi(Ru)
                    </th>
                    <th>
                        Norma
                    </th>
                    <th>
                        O'lchov Birligi
                    </th>
                    <th>
                        Amallar
                    </th>

                </tr>
                </thead>
                <tbody>
                {material.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.code}</td>
                        <td><img src={"#"}/></td>
                        <td>{value.nameUZ}</td>
                        <td>{value.nameRu}</td>
                        <td>{value.norma}</td>
                        <td>{value.measurement.nameUz}</td>
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

export default Material;