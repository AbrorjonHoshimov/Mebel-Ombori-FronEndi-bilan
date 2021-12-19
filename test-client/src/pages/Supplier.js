import React, {useEffect, useState} from 'react';
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import {addSuplier, deleteSuplier, editSuplier, forDeleteModal, forShowModal, getSuplier} from "../store/suplier";

const Supplier = ({suplier,deleteModal,showModal,getSuplier,addSuplier,editSuplier,deleteSuplier,forShowModal,forDeleteModal}) => {

    const [currentClient, setcurrentClient] = useState(undefined)

    useEffect(() => {
        getSuplier()
    }, [])

    const saveClient = (event,values) => {
        if (!currentClient) {
          addSuplier(values)
        }else {
           editSuplier(currentClient.id,values)
            setcurrentClient(undefined)
        }
        forShowModal()
    }

    function deleteClient(value) {
      deleteSuplier(value.id)
        setcurrentClient(undefined)
       forDeleteModal()
    }


    function deleteClientRoad(value) {
forDeleteModal()
        setcurrentClient(value)
    }
    function editClientRoad(value) {
        setcurrentClient(value)
       forShowModal()
    }




    return (
        <div className={"container"}>
            <button className={'btn btn-success '} style={{margin: '20px 0'}} onClick={forShowModal}>Qo'shish</button>

            <Modal isOpen={showModal}>
                <ModalHeader toggle={() => {
                    forShowModal()
                }}>
                    Taminotchi Qo'shish
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>

                        <AvField name="name" label="Nomi" required  value={currentClient ? currentClient.name : ""}/>
                        <AvField name="phone" label="Telefon Raqami" required value={currentClient ? currentClient.phone : ""}/>
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
                    <Button onClick={() => deleteClient(currentClient)} >xa</Button>
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
                        Mijoz Ismi
                    </th>
                    <th>
                        Telefon Raqami
                    </th>
                    <th>
                        Operations
                    </th>

                </tr>
                </thead>
                <tbody>
                {suplier.map((value, index) => {
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

const mapStateToProps=(state)=>({
    suplier:state.suplier.suplier,
    showModal:state.suplier.showModal,
    deleteModal:state.suplier.deleteModal
})
const mapDispatchToProps={getSuplier,addSuplier,editSuplier,deleteSuplier,forShowModal,forDeleteModal}
export default connect(mapStateToProps,mapDispatchToProps)(Supplier);