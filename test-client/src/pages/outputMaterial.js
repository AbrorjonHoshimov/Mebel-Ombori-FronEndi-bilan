import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import {
    addOutputMaterial,
    deleteOutputMaterial,
    editOutputMaterial, forDeleteModal,
    getOutputMaterial,
    modalToggle
} from "../store/outputMaterial";
import {getMaterial} from "../store/material";

const OutputMaterial = ({outMat,showModal,deleteModal,addOutputMaterial,material,modalToggle,deleteOutputMaterial,forDeleteModal,editOutputMaterial,getOutputMaterial,getMaterial}) => {
    const [currentClient, setcurrentClient] = useState(undefined)




    useEffect(() => {
        getMaterial()
        getOutputMaterial()
    }, [])


    const saveClient = (event, values) => {
        if (!currentClient) {
           addOutputMaterial(values)
        } else {
           editOutputMaterial(currentClient.id,values)
            setcurrentClient(undefined)
        }
        modalToggle()
    }

    function deleteClient(value) {
       deleteOutputMaterial(value.id)
        setcurrentClient(undefined)
        forDeleteModal()
    }



    function deleteClientRoad(value) {
        forDeleteModal()
        setcurrentClient(value)
    }

    function editClientRoad(value) {
        setcurrentClient(value)
        modalToggle()
    }


    return (
        <div className={"container"}>
            <button className={'btn btn-success '} style={{margin: '20px 0'}} onClick={modalToggle}>Qo'shish</button>

            <Modal isOpen={showModal}>
                <ModalHeader toggle={() => {
                    modalToggle()
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
                    forDeleteModal()
                }}>
                    O'chirishni tasdiqlaysizmi?
                </ModalHeader>
                <ModalBody>
                    <Button onClick={() => deleteClient(currentClient)}>xa</Button>
                    <Button onClick={() => forDeleteModal()}>Yo'q</Button>
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
                {outMat.map((value, index) => {
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

const mapStateToProps=(state)=>({
    outMat:state.outputMaterial.outputMaterial,
    showModal:state.outputMaterial.showModal,
    deleteModal:state.outputMaterial.deleteModal,
    material:state.material.material

})
const mapDispatchToProps={getOutputMaterial,getMaterial,addOutputMaterial,editOutputMaterial,deleteOutputMaterial,modalToggle,forDeleteModal}
export default connect(mapStateToProps,mapDispatchToProps)(OutputMaterial);