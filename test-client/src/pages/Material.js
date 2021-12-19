import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import {addMaterial, deleteMaterial, editMaterial, forDeleteModal, getMaterial, modalToggle} from "../store/material";
import {getMeasurements} from "../store/measurement";

const Material = ({materials, showModal, deleteModal, measurement, getMaterial, forDeleteModal,
                      editMaterial, deleteMaterial,addMaterial, getMeasurements, modalToggle
                  }) => {
    const [currentClient, setcurrentClient] = useState(undefined)


    useEffect(() => {
        getMaterial()
        getMeasurements()
    }, [])


    const saveClient = (event, values) => {
        if (!currentClient) {
            addMaterial(values)
        } else {
            editMaterial(currentClient.id, values)
            setcurrentClient(undefined)
        }
        modalToggle()
    }

    function deleteClient(value) {
        deleteMaterial(value.id)
        setcurrentClient(undefined)
        forDeleteModal()
    }

    function deleteIgnore() {
        forDeleteModal()
        setcurrentClient(undefined)
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
        <div className={'container'}>
            <button className={'btn btn-success '} style={{margin: '20px 0'}} onClick={modalToggle}>Qo'shish</button>

            <Modal isOpen={showModal}>
                <ModalHeader toggle={() => {
                    modalToggle()
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
                    forDeleteModal()
                }}>
                    O'chirishni tasdiqlaysizmi?
                </ModalHeader>
                <ModalBody>
                    <Button onClick={() => deleteClient(currentClient)}>xa</Button>
                    <Button onClick={() => deleteIgnore()}>Yo'q</Button>
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
                {materials.map((value, index) => {
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
const mapStateToProps = (state) => ({
    materials: state.material.material,
    measurement: state.measurement.measurement,
    showModal: state.material.showModal,
    deleteModal: state.material.deleteModal

})
const mapDispatchToProps = {getMaterial, getMeasurements, modalToggle, forDeleteModal, addMaterial,deleteMaterial, editMaterial}
export default connect(mapStateToProps, mapDispatchToProps)(Material);