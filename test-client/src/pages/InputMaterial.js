import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import {
    addInputMaterial,
    deleteInputMaterial,
    editInputMaterial, forDeleteModal,
    getInputMaterial,
    modalToggle
} from "../store/inputMaterial";
import {getSuplier} from "../store/suplier";
import {getMaterial} from "../store/material";

const InputMaterial = ({inMaterial, showModal, deleteModal, suplier, material, getInputMaterial,
                           getSuplier, modalToggle, forDeleteModal, deleteInputMaterial, editInputMaterial, getMaterial, addInputMaterial
                       }) => {

    const [currentClient, setcurrentClient] = useState(undefined)

    useEffect(() => {
        getMaterial()
        getSuplier()
        getInputMaterial()
    }, [])


    const saveClient = (event, values) => {
        if (!currentClient) {
            addInputMaterial(values)
        } else {
            editInputMaterial(currentClient.id, values)
            setcurrentClient(undefined)
        }
        modalToggle()
    }

    function deleteClient(value) {
        deleteInputMaterial(value.id)
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
                            {suplier.map(((value, index) => {
                                return <option value={value.id}>{value.name}</option>
                            }))}
                        </AvField>
                        <AvField name="amount" label="Maxsulot miqdori" required
                                 value={currentClient ? currentClient.amount : ""}/>
                        <AvField name="price" label="Narxi" required
                                 value={currentClient ? currentClient.price : ""}/>
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
                {inMaterial.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.material.code + ' ' + value.material.nameUZ}</td>
                        <td>{value.amount}</td>
                        <td>{value.material.measurement.nameUz}</td>
                        <td>{value.price + ' $'}</td>
                        <td>{value.price * value.amount + ' $'}</td>
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

const mapStateToProps = (state) => ({
    inMaterial: state.inputMaterial.inputMaterial,
    deleteModal: state.inputMaterial.deleteModal,
    showModal: state.inputMaterial.showModal,
    suplier: state.suplier.suplier,
    material: state.material.material
})
const mapDispatchToProps = {
    getInputMaterial,
    getSuplier,
    getMaterial,
    deleteInputMaterial,
    modalToggle,
    forDeleteModal,
    addInputMaterial,
    editInputMaterial
}
export default connect(mapStateToProps, mapDispatchToProps)(InputMaterial);