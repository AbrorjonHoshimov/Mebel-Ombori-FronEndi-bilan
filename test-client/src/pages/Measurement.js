import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import {
    addMeasurement,
    deleteMeasurement,
    editMeasurement,
    forDeleteModall,
    forShowModal,
    getMeasurements
} from "../store/measurement";

const Measurement = ({deleteModal, measurements, showModal, getMeasurements, forShowModal,
                         forDeleteModall, addMeasurement, deleteMeasurement, editMeasurement
                     }) => {


    const [currentClient, setcurrentClient] = useState(undefined)

    useEffect(() => {
        getMeasurements()
    }, [])

    const saveClient = (event, values) => {
        if (!currentClient) {
            addMeasurement(values)
        } else {
            editMeasurement(currentClient.id, values)
            setcurrentClient(undefined)
        }
        forShowModal()
    }

    function deleteClient(value) {
        deleteMeasurement(value.id)
        setcurrentClient(undefined)
        forDeleteModall()
    }

    function deleteClientRoad(value) {
        forDeleteModall()
        setcurrentClient(value)
    }

    function editClientRoad(value) {
        setcurrentClient(value)
        forShowModal()
    }


    return (
        <div className={"container"}>
            <button className={'btn btn-warning '} style={{margin: '20px 0'}} onClick={forShowModal}>Qo'shish</button>

            <Modal isOpen={showModal}>
                <ModalHeader toggle={() => {
                    forShowModal()
                }}>
                    O'lchov Birligi Qo'shish
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>
                        <AvField name="nameUz" label="NameUz" required
                                 value={currentClient ? currentClient.nameUz : ""}/>
                        <AvField name="nameRu" label="NameRu" required
                                 value={currentClient ? currentClient.nameRu : ""}/>
                        <Button color="success">Save</Button>
                    </AvForm>
                </ModalBody>
            </Modal>
            <Modal isOpen={deleteModal}>
                <ModalHeader toggle={() => {
                    forDeleteModall()
                }}>
                    O'chirishni tasdiqlaysizmi?
                </ModalHeader>
                <ModalBody>
                    <Button onClick={() => deleteClient(currentClient)}>xa</Button>
                    <Button onClick={() => forDeleteModall()}>Yo'q</Button>
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
                {measurements.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.nameUz}</td>
                        <td>{value.nameRu}</td>
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
    measurements: state.measurement.measurement,
    showModal: state.measurement.showModal,
    deleteModal: state.measurement.forDeleteModal
})
const mapDispatchToProps = {
    getMeasurements,
    forShowModal,
    forDeleteModall,
    deleteMeasurement,
    addMeasurement,
    editMeasurement
}
export default connect(mapStateToProps, mapDispatchToProps)(Measurement);