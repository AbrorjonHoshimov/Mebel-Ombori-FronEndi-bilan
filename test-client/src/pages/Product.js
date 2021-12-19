import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
import {Button, Modal, ModalBody, ModalHeader, Table} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import {connect} from "react-redux";
import {addProduct, deleteProduct, editProduct, forDeleteModal, getProduct, toggleModal} from "../store/product";
import { getPrType} from "../store/productType";

const Product = ({productType,products,showModal,deleteModal,
                     deleteProduct, editProduct,addProduct,toggleModal,getProduct,forDeleteModal,getPrType}) => {
    const [currentClient, setcurrentClient] = useState(undefined)


    useEffect(() => {
        getPrType()
        getProduct()
    }, [])


    const saveClient = (event,values) => {
        if (!currentClient) {
          addProduct(values)
        }else {
          editProduct(currentClient.id,values)
            setcurrentClient(undefined)
        }
        toggleModal()
    }

    function deleteClient(value) {
      deleteProduct(value.id)
        setcurrentClient(undefined)
        forDeleteModal()
    }


    function deleteClientRoad(value) {
        forDeleteModal()
        setcurrentClient(value)
    }
    function editClientRoad(value) {
        setcurrentClient(value)
        toggleModal()
    }




    return (
        <div>
            <button className={'btn btn-success '} style={{margin: '20px 0'}} onClick={toggleModal}>Qo'shish</button>

            <Modal isOpen={showModal}>
                <ModalHeader toggle={() => {
                    toggleModal()
                }}>
                    Maxsulot qoshish
                </ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={saveClient}>
                        {/* With AvField */}
                        {/*<AvField type="checkbox" name="active" label="Active" value="false"/>*/}
                        {/* With AvGroup AvInput and AvFeedback to build your own */}

                        <AvField name="nameUz" label="NameUz" required  value={currentClient ? currentClient.nameUz : ""}/>
                        <AvField name="nameRu" label="NameRu" required value={currentClient ? currentClient.nameRu : ""}/>
                        <AvField type="select" name="productTypeId" label="Option" value={currentClient ? currentClient.productTypeId : ""}
                                 helpMessage="Idk, this is an example. Deal with it!">
                            <option value="">Maxsulot turini tanlang</option>
                            {productType.map(((value, index) => <option value={value.id}>{value.nameUz}</option>))}

                                {/*<option>2</option>*/}
                                {/*<option>3</option>*/}
                                {/*<option>4</option>*/}
                                {/*<option>5</option>*/}
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
                        Rasm
                    </th>
                    <th>
                        NomiUz
                    </th>
                    <th>
                        NomiRu
                    </th>
                    <th>
                        Maxsulot turi
                    </th>

                    <th>
                        Operations
                    </th>

                </tr>
                </thead>
                <tbody>
                {products.map((value, index) => {
                    return <tr style={{cursor: 'pointer'}}>
                        <td>{index + 1}</td>
                        <td><img src={"#"}/></td>
                        <td>{value.nameUz}</td>
                        <td>{value.nameRu}</td>
                        <td>{value.productType.nameUz}</td>
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
    products:state.product.product,
    productType:state.productType.productType,
    showModal:state.product.showModal,
    deleteModal:state.product.deleteModal
})
const mapDispatchToProps={getProduct,toggleModal,forDeleteModal,getPrType,addProduct,editProduct,deleteProduct}
export default connect(mapStateToProps,mapDispatchToProps)(Product);