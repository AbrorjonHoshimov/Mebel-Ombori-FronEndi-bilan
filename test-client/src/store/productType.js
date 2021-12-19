import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";
const productTypeSlice = createSlice({
    name:'productType',
    initialState:{
        productType:[],
        showModal:false,
        forDeleModal:false
    },
    reducers:{
        getProductType:((state, action) => {
            state.productType=action.payload
        }),
        modalHandler:((state) => {
            state.showModal=!state.showModal
        }),
        deleteModalHandler:((state)=>{
            state.forDeleModal=!state.forDeleModal
        })

    }
})

export function getPrType(){
    return function (dispatch){
        axios.get(API_PATH+'productType/list',tokenHeader).then((res)=>{
            dispatch({
                type:'productType/getProductType',
                payload:res.data
            })
        })
    }
}
export function toggle(){
    return function (dispatch){
        dispatch({
            type:'productType/modalHandler'
        })
    }
}

export function forDeleteModal(){
    return function (dispatch){
        dispatch({
            type:'productType/deleteModalHandler'
        })
    }
}
export function deleteProductType(id){
    return function (dispatch){
        axios.delete(API_PATH+"productType/"+id,tokenHeader).then((res)=>{
            dispatch(getPrType())
            toast.success(res.data.message)
        }).catch((error) => {
            toast.error("Xatolik!")
        })
    }
}
export function addProductType(data){
    return function (dispatch){
        axios.post(API_PATH+"productType/add",data,tokenHeader).then((res)=>{
            dispatch(getPrType())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("Xatolik")
        })
    }

}
export function editProductType(id,data){
    return function (dispatch){
        axios.put(API_PATH+"productType/edit/"+id,data,tokenHeader).then((res)=>{
            dispatch(getPrType())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik!")
        })
    }
}

export default productTypeSlice.reducer

