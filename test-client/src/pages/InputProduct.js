import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import {
    addInputProduct,
    deleteInputProduct,
    editInputProduct,
    forDeleteModal,
    getInputProduct,
    modalToggle
} from "../store/inputProduct";
import {getProduct} from "../store/product";
import {getPrType} from "../store/productType";

const InputProduct = ({inputProduct,product,productType,showModal,deleteModal,getPrType,getProduct,getInputProduct,modalToggle,forDeleteModal,deleteInputProduct,editInputProduct,addInputProduct}) => {

    const [currentClient, setcurrentClient] = useState(undefined)


    useEffect(() => {
        getInputProduct()
        getProduct()
        getPrType()
    }, [])


    const saveClient = (event, values) => {
        if (!currentClient) {
            addInputProduct(values)
        } else {
            editInputProduct(currentClient.id,values)
            setcurrentClient(undefined)
        }
        modalToggle()
    }

    function deleteClient(value) {
      deleteModal(value.id)
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
                   Omborga Tayyor Maxsulot Kirimi
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>
                        {/* With AvField */}
                        {/*<AvField type="checkbox" name="active" label="Active" value="false"/>*/}
                        {/* With AvGroup AvInput and AvFeedback to build your own */}

                        <AvField type="select" name="productTypeId" label="Option"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Maxsulot turini tanlang</option>
                            {productType.map(((value, index) => {
                                return <option value={value.id}>{value.nameUz}</option>
                            }))}
                        </AvField>
                        <AvField type="select" name="productId" label="Option"
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Maxsulot Nomini Tanlang</option>
                            {product.map(((value, index) => {
                                return <option value={value.id}>{value.nameUz}</option>
                            }))}
                        </AvField>
                        <AvField name="amount" label="Maxsulot miqdori" required value={currentClient ? currentClient.amount : ""}/>
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
                        Maxsulot turi
                    </th>
                    <th>
                        Miqdori
                    </th>
                    <th>
                        Narxi
                    </th>
                    <th>
                        Umumiy summa
                    </th>

                    <th>
                        Sana
                    </th>

                    <th>
                        Amallar
                    </th>

                </tr>
                </thead>
                <tbody>
                {inputProduct.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td>{value.product.nameUz}</td>
                        <td>{value.productType.nameUz}</td>
                        <td>{value.amount}</td>
                        <td>{value.price+' $'}</td>
                        <td>{value.price*value.amount+' $'}</td>
                        <td>{value.inputDate}</td>
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
    inputProduct:state.inputProduct.inputProduct,
    showModal:state.inputProduct.showModal,
    deleteModal:state.inputProduct.deleteModal,
    product:state.product.product,
    productType:state.productType.productType,

})
const mapDispatchToProps ={getInputProduct,getProduct,getPrType,modalToggle,forDeleteModal,addInputProduct,editInputProduct,deleteInputProduct}
export default connect(mapStateToProps,mapDispatchToProps)(InputProduct);