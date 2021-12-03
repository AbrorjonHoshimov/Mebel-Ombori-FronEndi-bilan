import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const Measurement = () => {
    const [measurement, setmeasurement] = useState([])
    const [disable, setDisable] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [currentClient, setcurrentClient] = useState(undefined)

    const getMeasurement = () => {
        axios.get(API_PATH + 'measurement/list',tokenHeader).then(res => {
            // console.log(res.data)
            setmeasurement(res.data)
        })
    }
    useEffect(() => {
        getMeasurement()
    }, [])

    const openModal = () => {
        setDisable(!disable)
    }
    const saveClient = (event,values) => {
        console.log(currentClient)
        if (!currentClient) {
            axios.post(API_PATH + "measurement/add", values,tokenHeader).then(res => {
                toast.success(res.data.message)
                getMeasurement()

            })
        }else {
            axios.put(API_PATH+"measurement/edit/"+currentClient.id,values,tokenHeader).then(res=>{
                getMeasurement()
            })
            setcurrentClient(undefined)
        }
        openModal()
    }

    function deleteClient(value) {
        axios.delete(API_PATH + "measurement/" + value.id,tokenHeader).then(res => {
            getMeasurement()
        })
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
            <button className={'btn btn-warning '} style={{margin: '20px 0'}} onClick={openModal}>Qo'shish</button>

            <Modal isOpen={disable}>
                <ModalHeader toggle={() => {
                    openModal()
                }}>
                    O'lchov Birligi Qo'shish
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>
                        {/* With AvField */}
                        {/*<AvField type="checkbox" name="active" label="Active" value="false"/>*/}
                        {/* With AvGroup AvInput and AvFeedback to build your own */}
                        {/*<AvField type="select" name="select" label="Option"*/}
                        {/*         helpMessage="Idk, this is an example. Deal with it!">*/}
                        {/*    <option>1</option>*/}
                        {/*    <option>2</option>*/}
                        {/*    <option>3</option>*/}
                        {/*    <option>4</option>*/}
                        {/*    <option>5</option>*/}
                        {/*</AvField>*/}
                        <AvField name="nameUz" label="NameUz" required  value={currentClient ? currentClient.nameUz : ""}/>
                        <AvField name="nameRu" label="NameRu" required value={currentClient ? currentClient.nameRu : ""}/>
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
                        NomiUz
                    </th>
                    <th>
                        NomiRu
                    </th>
                    <th>
                        Operations
                    </th>

                </tr>
                </thead>
                <tbody>
                {measurement.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.nameUz}</td>
                        <td>{value.nameRu}</td>
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

export default Measurement;