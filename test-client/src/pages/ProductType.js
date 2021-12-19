import React, {useEffect, useState} from 'react';
import {AvField, AvForm} from "availity-reactstrap-validation";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {
    addProductType,
    deleteProductType,
    editProductType,
    forDeleteModal,
    getPrType,
    toggle
} from "../store/productType";

const ProductType = ({productType, getPrType, toggle, showModal,
                         deleteModal, forDeleteModal, deleteProductType, addProductType,editProductType}) => {

    const [current, setcurrent] = useState(undefined)

    useEffect(() => {
        getPrType()
    }, [])



    const saveClient = (event, values) => {
        if (!current) {
            addProductType(values)
        } else {
            editProductType(current.id,values)
            setcurrent(undefined)
        }
        toggle()
    }


    function deleteClient(value) {
        deleteProductType(value.id)
        setcurrent(undefined)
        forDeleteModal()

    }


    function deleteClientRoad(value) {
        forDeleteModal()
        setcurrent(value)
    }

    function editClientRoad(value) {
        setcurrent(value)
        toggle()
    }


    return (
        <div className={"container"}>
            <button className={'btn btn-success '} style={{margin: '20px 0'}} onClick={toggle}>Qo'shish</button>

            <Modal isOpen={showModal}>
                <ModalHeader toggle={() => {
                    toggle()
                }}>
                    Maxsulot Turini Qo'shish
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
                        <AvField name="nameUz" label="NameUz" required
                                 value={current ? current.nameUz : ""}/>
                        <AvField name="nameRu" label="NameRu" required
                                 value={current ? current.nameRu : ""}/>
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
                    <Button onClick={() => deleteClient(current)}>xa</Button>
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
                {productType.map((value, index) => {
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
    productType: state.productType.productType,
    showModal: state.productType.showModal,
    deleteModal: state.productType.forDeleModal
})
const mapDispatchToProps = {getPrType, toggle, forDeleteModal, deleteProductType, addProductType,editProductType}
export default connect(mapStateToProps, mapDispatchToProps)(ProductType);