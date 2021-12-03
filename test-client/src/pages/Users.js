import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

const Users = () => {
    const [user, setUser] = useState([])
    const [disable, setDisable] = useState(false)
    const [deleteModal, setdeleteModal] = useState(false)
    const [currentClient, setcurrentClient] = useState(undefined)

    const getUser = () => {
        axios.get(API_PATH + 'user',tokenHeader).then(res => {
            // console.log(res.data)
            setUser(res.data)
        })
    }
    useEffect(() => {
        getUser()
    }, [])

    const openModal = () => {
        setDisable(!disable)
    }
    const saveClient = (event,values) => {
        if (!currentClient) {
            axios.post(API_PATH + "suplier/add", values,tokenHeader).then(res => {
                toast.success(res.data.message)
                getUser()

            })
        }else {
            axios.put(API_PATH+"suplier/edit/"+currentClient.id,values,tokenHeader).then(res=>{
                getUser()
            })
            setcurrentClient(undefined)
        }
        openModal()
    }

    function deleteClient(value) {
        axios.delete(API_PATH + "suplier/"+value.id,tokenHeader).then(res => {
            getUser()
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
                    Taminotchi Qo'shish
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
                        <AvField name="name" label="Nomi" required  value={currentClient ? currentClient.name : ""}/>
                        <AvField name="phone" label="Telefon Raqami" required value={currentClient ? currentClient.phone : ""}/>
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
                        Ismi
                    </th>
                    <th>
                        Familiyasi
                    </th>
                    <th>
                        Lavozimi
                    </th>

                </tr>
                </thead>
                <tbody>
                {supplier.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.name}</td>
                        <td>{value.phone}</td>
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

export default Users;