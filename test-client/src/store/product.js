import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_PATH, tokenHeader} from "../component/Constants";
import {toast} from "react-toastify";

const productSlice=createSlice({
    name:'product',
    initialState:{
        product:[],
        showModal:false,
        deleteModal:false,
    },
    reducers:{
        getproduct:((state, action) => {
            state.product=action.payload
        }),
        modalHandler:(state => {
            state.showModal=!state.showModal
        }),
        dltModalHandler:(state => {
            state.deleteModal=!state.deleteModal
        })
    }

})

export function getProduct(){
    return function (dispatch){
        axios.get(API_PATH+"product/list",tokenHeader).then((res)=>{
            dispatch({
                type:'product/getproduct',
                payload:res.data
            })
        })
    }
}
export function addProduct(data){
    return function (dispatch){
        axios.post(API_PATH+'product/add',data,tokenHeader).then((res)=>{
            dispatch(getProduct())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik")
        })
    }
}
export function editProduct(id,data){
    return function (dispatch){
        axios.put(API_PATH+'product/edit/'+id,data,tokenHeader).then((res)=>{
            dispatch(getProduct())
            toast.success("O'zgartirildi")
        }).catch((error)=>{
            toast.error("Xatolik")
        })
    }
}
export function deleteProduct(id){
    return function (dispatch){
        axios.delete(API_PATH+'product/'+id,tokenHeader).then((res)=>{
            dispatch(getProduct())
            toast.success(res.data.message)
        }).catch((error)=>{
            toast.error("xatolik")
        })
    }

}
export function toggleModal(){
    return function (dispatch){
            dispatch({
                type:'product/modalHandler',
            })
    }
}
export function forDeleteModal(){
    return function (dispatch){
            dispatch({
                type:'product/dltModalHandler',
            })
    }
}


export default productSlice.reducer